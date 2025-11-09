import json
import os
import re
import sys
from typing import Dict, List

try:
    from pdfminer.high_level import extract_text  # type: ignore
except Exception as e:
    print("Failed to import pdfminer. Please run: pip install -r requirements.txt", file=sys.stderr)
    raise

def guess_lines(text: str) -> List[str]:
    return [ln.strip() for ln in text.splitlines() if ln.strip()]

def extract_basic(lines: List[str]) -> Dict[str, str]:
    data: Dict[str, str] = {}
    if lines:
        data["name"] = lines[0]
    if len(lines) > 1:
        data["title"] = lines[1]

    email_match = next((re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", ln) for ln in lines if re.search(r"@", ln)), None)
    if email_match:
        data["email"] = email_match.group(0)

    phone_match = next((re.search(r"(\+?\d[\d \-\(\)]{7,}\d)", ln) for ln in lines if re.search(r"\d", ln)), None)
    if phone_match:
        data["phone"] = re.sub(r"[^\d+]", "", phone_match.group(0))

    # Links
    links: Dict[str, str] = {}
    for ln in lines:
        if "linkedin.com" in ln.lower():
            url = re.search(r"https?://\S+", ln)
            links["linkedin"] = url.group(0) if url else ln.split()[-1]
        if "github.com" in ln.lower():
            url = re.search(r"https?://\S+", ln)
            links["github"] = url.group(0) if url else ln.split()[-1]
        if "portfolio" in ln.lower() or "website" in ln.lower() or "saif" in ln.lower():
            url = re.search(r"https?://\S+", ln)
            if url:
                links["website"] = url.group(0)
    if links:
        data["links"] = links

    # Location guess from line containing a comma and letters
    location_line = next((ln for ln in lines[:12] if ("," in ln and any(c.isalpha() for c in ln))), None)
    if location_line:
        data["location"] = location_line
    return data

def extract_sections(text: str) -> Dict[str, List[str]]:
    # naive section split by common headings
    sections = {
        "summary": [],
        "skills": [],
        "experience": [],
        "projects": [],
        "education": [],
    }
    current = None
    for ln in guess_lines(text):
        low = ln.lower()
        if any(k in low for k in ["summary", "objective", "profile"]):
            current = "summary"; continue
        if "skill" in low:
            current = "skills"; continue
        if "experience" in low or "employment" in low or "work history" in low:
            current = "experience"; continue
        if "project" in low:
            current = "projects"; continue
        if "education" in low or "university" in low or "bachelor" in low or "master" in low:
            current = "education"; continue
        if current:
            sections[current].append(ln)
    return sections

def parse_skills(lines: List[str]) -> List[Dict[str, List[str]]]:
    groups: List[Dict[str, List[str]]] = []
    buf: List[str] = []
    for ln in lines:
        if ":" in ln:
            if buf:
                buf = []
            parts = ln.split(":", 1)
            cat = parts[0].strip().title()
            items = [x.strip() for x in re.split(r"[,\u2022•|/]", parts[1]) if x.strip()]
            groups.append({"category": cat, "items": items})
        else:
            buf.append(ln)
    if not groups and buf:
        merged = " ".join(buf)
        items = [x.strip() for x in re.split(r"[,\u2022•|/]", merged) if x.strip()]
        if items:
            groups.append({"category": "Skills", "items": items})
    return groups

def parse_experience(lines: List[str]):
    items = []
    block: List[str] = []
    for ln in lines + [""]:
        if re.search(r"\b(20\d{2}|19\d{2})\b", ln) and block:
            # flush previous block and start new
            items.append(block)
            block = [ln]
        else:
            block.append(ln)
    if block:
        items.append(block)
    result = []
    for blk in items:
        blk = [b for b in blk if b]
        if not blk:
            continue
        header = blk[0]
        role_company = blk[1] if len(blk) > 1 else ""
        period = header
        role = role_company
        company = ""
        if "•" in role_company:
            parts = [p.strip() for p in role_company.split("•", 1)]
            role, company = parts[0], parts[1]
        elif " at " in role_company.lower():
            parts = re.split(r"\bat\b", role_company, flags=re.I)
            role, company = parts[0].strip(), parts[1].strip() if len(parts) > 1 else ""
        bullets = [re.sub(r"^[•\-\u2022]\s*", "", x).strip() for x in blk[2:]]
        description = bullets[0] if bullets else ""
        result.append({
            "company": company or "Company",
            "role": role or "Role",
            "period": period,
            "description": description,
            "bullets": bullets[:6]
        })
    return result[:10]

def parse_projects(lines: List[str]):
    projects = []
    for ln in lines:
        if not ln:
            continue
        name = ln
        desc = ""
        if " - " in ln:
            parts = ln.split(" - ", 1)
            name, desc = parts[0].strip(), parts[1].strip()
        projects.append({"name": name, "description": desc})
    return projects[:9]

def parse_education(lines: List[str]):
    items = []
    block = []
    for ln in lines + [""]:
        if ln and ln.isupper() and block:
            items.append(block)
            block = [ln]
        else:
            block.append(ln)
    if block:
        items.append(block)
    result = []
    for blk in items:
        blk = [b for b in blk if b]
        if not blk:
            continue
        school = blk[0]
        degree = blk[1] if len(blk) > 1 else ""
        period = next((b for b in blk if re.search(r"(20|19)\d{2}", b)), "")
        result.append({"school": school, "degree": degree, "period": period})
    return result[:5]

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/parse_resume.py <path-to-resume.pdf>", file=sys.stderr)
        sys.exit(1)
    pdf_path = sys.argv[1]
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}", file=sys.stderr)
        sys.exit(1)
    text = extract_text(pdf_path)
    lines = guess_lines(text)
    data = extract_basic(lines)
    sections = extract_sections(text)
    summary_text = " ".join(sections.get("summary", [])).strip()
    if summary_text:
        data["summary"] = summary_text
    skills = parse_skills(sections.get("skills", []))
    if skills:
        data["skills"] = skills
    experience = parse_experience(sections.get("experience", []))
    if experience:
        data["experience"] = experience
    projects = parse_projects(sections.get("projects", []))
    if projects:
        data["projects"] = projects
    education = parse_education(sections.get("education", []))
    if education:
        data["education"] = education

    out_dir = os.path.join("src", "data")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "generated.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Wrote {out_path} with {len(data.keys())} top-level fields.")

if __name__ == "__main__":
    main()

