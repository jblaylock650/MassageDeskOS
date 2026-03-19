from pathlib import Path

from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 36
GUTTER = 18
COLUMN_WIDTH = (PAGE_WIDTH - (MARGIN * 2) - GUTTER) / 2


def wrap_text(text: str, font_name: str, font_size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = word if not current else f"{current} {word}"
        if stringWidth(trial, font_name, font_size) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_section(
    pdf: canvas.Canvas,
    x: float,
    y: float,
    heading: str,
    body_lines: list[str],
    heading_color=HexColor("#0f766e"),
    body_font="Helvetica",
    body_size=9.2,
    leading=11.2,
) -> float:
    pdf.setFillColor(heading_color)
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(x, y, heading)
    y -= 13
    pdf.setFillColor(black)
    pdf.setFont(body_font, body_size)
    for line in body_lines:
        pdf.drawString(x, y, line)
        y -= leading
    return y - 6


def draw_bullets(
    pdf: canvas.Canvas,
    x: float,
    y: float,
    heading: str,
    bullets: list[str],
    max_width: float,
) -> float:
    pdf.setFillColor(HexColor("#0f766e"))
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(x, y, heading)
    y -= 13
    pdf.setFillColor(black)
    pdf.setFont("Helvetica", 9)
    bullet_indent = 8
    text_x = x + bullet_indent
    text_width = max_width - bullet_indent
    for bullet in bullets:
        lines = wrap_text(bullet, "Helvetica", 9, text_width)
        for index, line in enumerate(lines):
            prefix = "-" if index == 0 else " "
            pdf.drawString(x, y, prefix)
            pdf.drawString(text_x, y, line)
            y -= 10.8
        y -= 1.2
    return y - 5


def main() -> None:
    output_dir = Path("output/pdf")
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "theralinknetwork-app-summary.pdf"

    pdf = canvas.Canvas(str(output_path), pagesize=letter)
    pdf.setTitle("TheraLinkNetwork App Summary")

    # Header
    pdf.setFillColor(HexColor("#115e59"))
    pdf.roundRect(MARGIN, PAGE_HEIGHT - 102, PAGE_WIDTH - (MARGIN * 2), 58, 10, fill=1, stroke=0)
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 20)
    pdf.drawString(MARGIN + 16, PAGE_HEIGHT - 67, "TheraLinkNetwork")
    pdf.setFont("Helvetica", 9.2)
    pdf.drawString(
        MARGIN + 16,
        PAGE_HEIGHT - 84,
        "One-page repo-based summary of the current app implementation",
    )

    left_x = MARGIN
    right_x = MARGIN + COLUMN_WIDTH + GUTTER
    start_y = PAGE_HEIGHT - 128

    what_it_is = wrap_text(
        (
            "TheraLinkNetwork is a React single-page web app branded as a professional network for "
            "licensed massage therapists in the US. The repo shows community, CE event, messaging, "
            "profile, and marketplace flows, with Supabase-backed auth and profile data."
        ),
        "Helvetica",
        9.2,
        COLUMN_WIDTH,
    )
    who_its_for = wrap_text(
        (
            "Primary persona: licensed massage therapists who want professional networking, peer "
            "community, CE discovery, and therapist-focused profile sharing."
        ),
        "Helvetica",
        9.2,
        COLUMN_WIDTH,
    )

    feature_bullets = [
        "Email/password and Google sign-in, plus protected member-only routes.",
        "Social feed UI with post creation, likes, comments, story cards, image lightbox, and toast alerts.",
        "Therapist profile and edit flows with fields like license details, specialties, modalities, and practice data.",
        "Connections, groups, and notifications views for community engagement.",
        "Events and CE browsing with search, category filters, saved state, and event creation modal.",
        "Marketplace listings, seller contact flow, direct messaging UI, and settings/privacy/security screens.",
    ]

    architecture_bullets = [
        "Vite + React 19 + TypeScript SPA boots from src/main.tsx into App, wrapped by BrowserRouter and AuthProvider.",
        "src/router/config.tsx lazily loads page modules; ProtectedRoute redirects unauthenticated users back to '/'.",
        "AuthContext uses the Supabase client and .env values for session lookup, Google/email auth, profile inserts, reads, and updates.",
        "Most feature pages currently read from src/mocks/* and local component state rather than a live domain backend.",
        "Live data services for feed posts, messages, events, groups, marketplace transactions, and Stripe/Firebase usage: Not found in repo.",
    ]

    run_steps = [
        "From the repo root, install dependencies if needed: npm install.",
        "Ensure .env provides VITE_PUBLIC_SUPABASE_URL and VITE_PUBLIC_SUPABASE_ANON_KEY.",
        "Start the app with npm run dev.",
        "Open http://localhost:3000; sign in or create an account to reach protected pages.",
        "Production deployment steps or CI/CD setup: Not found in repo.",
    ]

    evidence_note = wrap_text(
        (
            "Repo evidence used: package.json, vite.config.ts, .env, src/main.tsx, src/App.tsx, "
            "router/auth files, and representative page modules."
        ),
        "Helvetica-Oblique",
        8,
        PAGE_WIDTH - (MARGIN * 2),
    )

    left_y = draw_section(pdf, left_x, start_y, "What It Is", what_it_is)
    left_y = draw_section(pdf, left_x, left_y, "Who It's For", who_its_for)
    left_y = draw_bullets(pdf, left_x, left_y, "What It Does", feature_bullets, COLUMN_WIDTH)

    right_y = draw_bullets(pdf, right_x, start_y, "How It Works", architecture_bullets, COLUMN_WIDTH)
    right_y = draw_bullets(pdf, right_x, right_y, "How to Run", run_steps, COLUMN_WIDTH)

    footer_y = min(left_y, right_y) - 2
    pdf.setStrokeColor(HexColor("#cbd5e1"))
    pdf.line(MARGIN, footer_y, PAGE_WIDTH - MARGIN, footer_y)
    footer_y -= 12
    pdf.setFillColor(HexColor("#475569"))
    pdf.setFont("Helvetica-Oblique", 8)
    for line in evidence_note:
        pdf.drawString(MARGIN, footer_y, line)
        footer_y -= 9

    pdf.showPage()
    pdf.save()
    print(output_path)


if __name__ == "__main__":
    main()
