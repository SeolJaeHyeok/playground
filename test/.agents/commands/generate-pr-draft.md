# PR Draft 자동 작성 (Title 제안 + Draft 채우기)

너는 PR 제목과 본문을 함께 "제안/작성"하는 PR 작성 도우미다.
아래 규칙을 **절대 위반하지 말고** 실행해라.

---

## ✅ 입력 파일 (반드시 읽기)
- `./pr/pr_prompt.md` : PR 컨텍스트/정책
- `./pr/pr_draft.md` : PR 초안 템플릿 + Auto draft

---

## 🎯 목표
1) `pr_prompt.md`와 `pr_draft.md`(Auto draft)를 바탕으로 PR 제목 1줄을 생성한다.
2) `pr_draft.md`의 FINAL 영역을 사람이 읽기 좋은 한국어 PR 본문으로 채운다.
3) 생성한 제목을 FINAL 영역 상단에 주석으로 저장하여 스크립트가 읽을 수 있도록 한다.
4) 작업 완료 후, 사용자에게 Draft PR 생성 여부를 확인하고 동의 시 스크립트를 실행한다.

**⚠️ 중요: PR 범위 제한**
- **반드시 Auto draft의 "커밋 정보 (전체)"와 "변경 파일 (전체)" 섹션에 나열된 내용만 반영해야 합니다.**
- Auto draft에 없는 내용은 절대 추가하지 마세요.
- 커밋되지 않은(uncommitted) 변경사항은 포함하지 마세요.
- 로컬에만 있는 변경사항은 포함하지 마세요.
- PR 본문에는 실제로 원격에 푸시된 커밋의 변경사항만 포함되어야 합니다.

**📌 커밋 정보 분석 방법**
- Auto draft의 "커밋 정보 (전체)" 섹션에 있는 모든 커밋을 분석합니다.
- 각 커밋의 제목(title)과 본문(body)을 모두 확인하여 정확한 내용을 파악합니다.
- 커밋 본문에 있는 상세 설명, 변경사항 목록, 이유 등을 모두 반영합니다.
- "자동 생성 요약"은 참고용일 뿐이며, 실제 분석은 전체 커밋 정보를 기반으로 합니다.

---

## 🔒 수정 범위 (엄수)

### ✅ 수정 가능
- `./pr/pr_draft.md`에서 아래 사이 **텍스트만** 수정 가능:
<!-- BEGIN:FINAL -->
<!-- END:FINAL -->
### ❌ 절대 수정 금지
- FINAL 마커 자체 (`<!-- BEGIN:FINAL -->`, `<!-- END:FINAL -->`)
- `<details> ... </details>` 블록 전체 (Auto draft 원문)
- FINAL 영역 밖의 그 어떤 내용
- `pr_prompt.md`

---

## 🧭 PR 제목 생성 규칙

### 공통
- 한 줄
- 60자 내외
- 한국어, 짧고 명확하게
- 사실 기반(추측 금지)
- 모호하면 "변경의 핵심 영향" 중심으로

### mode별 규칙 (pr_prompt.md 기준)
- **work / hotfix**
  - prefix 필수: Conventional Commits 형식 준수
  - 허용되는 타입: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `hotfix` 등
  - 커밋/Auto draft 내용을 보고 가장 적합한 prefix를 스스로 선택한다.
  - 예:
    - `feat: 결제 플로우 옵션 선택 단계 추가`
    - `fix: iOS 웹뷰에서 세션 만료 처리 오류 수정`
    - `refactor: 인증 로직 모듈화`
    - `chore: 의존성 업데이트`
    - `docs: API 문서 보완`
    - `test: 로그인 플로우 테스트 추가`
    - `style: 코드 포맷팅`
- **release**
  - prefix 강제하지 않음
  - 예:
    - `release: release-12-2 → main`
    - `release: v1.12.0 배포`

### 제목 출력 방식 (중요)
- 제목은 FINAL 영역 상단에 주석으로 저장한다.
- 응답 최상단에도 아래 형식으로 제안한다:

📌 Suggested PR Title:
```text
<여기에 제목 1줄>
```

**FINAL 영역에 저장할 형식:**
```markdown
<!-- BEGIN:FINAL -->
<!-- PR Title: <여기에 제목 1줄> -->
## ✅ 신규 기능
...
```

이렇게 하면 `create-pr-draft.sh` 스크립트가 주석에서 제목을 추출할 수 있습니다.

---

## 🚀 Draft PR 생성 단계

PR 본문 작성이 완료되면, 반드시 다음을 수행하라:

1. **작업 완료 안내**
   - PR 제목과 본문 작성이 완료되었음을 알린다.
   - 생성된 제목을 다시 한 번 표시한다.

2. **Draft PR 생성 확인**
   - 사용자에게 다음 질문을 한다:
   
   ```
   이 내용으로 Draft PR을 생성하시겠습니까?
   (GitHub CLI가 필요하며, Draft 상태로 생성됩니다)
   ```

3. **사용자 응답 처리**
   - 사용자가 "예" 또는 "yes" 또는 "y"로 응답하면:
     - 자동확인 모드로 `./scripts/pr/create-pr-draft.sh` 스크립트를 실행한다.
       ```bash
       AUTO_CONFIRM=true ./scripts/pr/create-pr-draft.sh
       ```
     - 스크립트 실행 결과를 사용자에게 알린다.
   - 사용자가 "아니오" 또는 "no" 또는 "n"로 응답하거나 응답하지 않으면:
     - "나중에 VSCode Task나 터미널에서 `./scripts/pr/create-pr-draft.sh`를 실행하실 수 있습니다."라고 안내한다.

**중요**: 
- 스크립트 실행 전에 사용자 확인을 받아야 한다.
- 스크립트 실행 실패 시 에러 메시지를 사용자에게 알려야 한다.
- GitHub CLI (`gh`)가 설치되어 있지 않으면 안내 메시지를 표시한다.
- **기존 PR이 있는 경우**: 같은 base와 head 브랜치로 이미 PR이 열려있으면, 새로 생성하지 않고 기존 PR의 제목과 본문을 업데이트합니다.