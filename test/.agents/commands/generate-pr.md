---
command: generate-pr
description: Run the full PR creation flow (VSCode Task → Story link update → PR draft generation)
---

# 🧩 PR Creation Flow

You are responsible for executing the **standardized PR creation workflow** used by everyone in this repository.
Follow the steps below **strictly in order**, validating all conditions before proceeding.

---

## 1️⃣ Determine Work Type & Run VSCode Task

### 📌 Select Work Type (Required)

First, you must clearly determine **what type of PR this is**.
If the work type is **not explicitly provided**, you must **stop immediately** and ask the user.

Available options:

- **Work**
  - Target branch: `release-*`
  - Examples: `feature/*`, `fix/*`, `refactor/*`
- **Hotfix**
  - Target branch: `main`
  - Examples: `hotfix/*`
- **Release**
  - Target branch: `main`
  - Examples: `release-*`

Ask the user:

> 이번 PR의 작업 유형을 선택해주세요.
>
> - `Work` : 일반 작업 (feature / fix / refactor → release 브랜치)
> - `Hotfix` : 긴급 수정 (hotfix → main 브랜치)
> - `Release` : 릴리즈 병합 (release → main 브랜치)
>
> 위 옵션 중 하나를 정확히 입력해주세요.

### ❗ Hard Rules

- If the work type is **not specified**:
  - ❌ Do NOT run any task
  - ❌ Do NOT continue to the next step
  - 🔁 Ask again until clarified

---

### ▶ Run the Matching VSCode Task

Once the work type is confirmed, run the **exact matching task**:

| Work Type | VSCode Task |
|---------|-------------|
| Work | Generate PR Draft (Work) |
| Hotfix | Generate PR Draft (Hotfix) |
| Release | Generate PR Draft (Release) |

This task generates the following file:

```text
./pr/pr_draft.md
```

Only proceed if the task **successfully completes**.

---

## 2️⃣ Update Story Link (Optional)

### 📌 Ask for Story / Spec Link

The generated `./pr/pr_draft.md` does **not** include a story link yet.

Ask the user:

> 연결할 스토리 / 기획 / 참고 문서가 있나요?
>
> 아래와 같이 **형식에 상관없이 자유롭게 입력해도 됩니다**:
> - 링크만 입력  
>   `https://example.com/...`
> - 마크다운 링크  
>   `[문서 제목](https://example.com/...)`
> - 제목과 링크를 함께 입력  
>   `문서 제목, https://example.com/...`
> - 자유 형식  
>   `제목: 문서 제목, URL: https://example.com/...`
>
> 스토리 링크 없이 진행하려면 `skip`을 입력하세요.

### Handling Rules

- ✅ If the user provides **any text that appears to reference a story**
  - Do NOT enforce a strict format
  - Preserve the user input as-is
  - Insert it into the **## 🔗 Story** section in `./pr/pr_draft.md`
- ⏭ If the user types `skip`
  - Skip this step and continue
- ❗ If the user response is unclear or empty
  - Ask again with the same guidance

> ⚠️ This step is optional.  
> Missing a story link must NOT block the flow.

---

## 3️⃣ Run PR Draft Generation Command

Finally, execute the Cursor command:

```text
generate-pr-draft
```

Command file:

```text
./.cursor/commands/generate-pr-draft.md
```

This step:
- Finalizes the PR description
- Prepares the content for GitHub PR creation

---

## ✅ Completion Criteria

Finish the flow only when all applicable conditions are met:

- [ ] Work type explicitly selected
- [ ] Correct VSCode Task executed
- [ ] (Optional) Story link updated or skipped
- [ ] `generate-pr-draft` command executed

PR creation itself (GitHub UI / CLI) is intentionally left to the user.
