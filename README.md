# Portfolio (Vite + React + Tailwind + Framer Motion)

An animated portfolio site that reads your resume PDF and fills the content automatically.

## Quickstart

1) Install Node dependencies:

```powershell
npm install
```

2) (First time) Set up Python venv and install parser requirements:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

3) Parse your resume PDF into `src/data/generated.json`:

```powershell
python scripts/parse_resume.py "C:\Users\salhara\Desktop\Saif-Omar-Al-Hara-FlowCV-Resume-20251021.pdf"
```

4) Run the site:

```powershell
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

## How it works

- The site imports data from `src/data/generated.json` if present and non-empty.
- If it's empty, it falls back to `src/data/sample.json`.
- You can safely edit either JSON to fine-tune content (names, skills, experience).

## Optional: Add your resume download

Put your `resume.pdf` into `public/` and link it from the UI if desired.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Python + pdfminer.six to parse PDF into JSON

