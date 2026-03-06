---
command: create-fe-tasks-from-story
description: Analyze Story documents and automatically generate frontend tasks
---

# Create FE Tasks from Story

Story 문서를 분석하여 FE 작업 Task를 자동으로 생성하는 커맨드입니다.
Story URL을 받아 분석하고, Task를 제안한 후 사용자 확인을 거쳐 Notion에 생성합니다.

---

## Step 1: Get Story URL

사용자에게 Story 문서 URL을 요청합니다.

> Story 문서의 Notion URL을 입력해주세요.

### Validation Rules

- Notion URL 형식 검증 (`https://www.notion.so/...`)
- URL이 제공되지 않으면 진행하지 않음

---

## Step 2: Fetch Template Page

개발 Task 데이터베이스에서 템플릿 페이지를 찾고 구조를 확인합니다.

### Database Information

- **Database URL**: `https://www.notion.so/welda/1d8a4e07955b81ba8744d758f9b1e67c`
- **data_source_id**: `collection://1d8a4e07-955b-811d-b9d5-000b189ca4a8`

### Workflow

1. **Access Database**
   - 데이터베이스 URL 또는 data_source_id를 사용하여 개발 Task 데이터베이스에 접근

2. **Search Template Page**
   - 데이터베이스 내에서 템플릿 페이지 제목으로 검색
   - 검색 키워드: "개발 템플릿" (또는 유사한 제목 패턴)
   - Use `notion-search` MCP tool

3. **Fetch Template Page**
   - 찾은 템플릿 페이지의 URL로 `notion-fetch` MCP tool 사용
   - 템플릿의 content 구조를 가져옴

4. **Analyze Template Structure**
   - 템플릿의 마크다운 구조를 파싱하여 섹션 구조 추출
   - 각 섹션의 제목과 형식을 동적으로 인식
   - 예시 섹션: `### 📌 Short description`, `### ✨ Proposed changed`, `### 📚 How to test`, `### 📸 ScreenShots`, `resolved(github) #` 등

5. **Store Template Structure**
   - 추출한 섹션 구조를 메모리에 저장하여 이후 Task 생성 시 사용

### Important Notes

- 템플릿 구조는 동적으로 추출되므로, 템플릿이 변경되어도 자동으로 반영됨
- 하드코딩된 섹션 이름을 사용하지 않음

---

## Step 3: Read and Analyze Story

Story 문서를 읽고 내용을 분석합니다.

### Workflow

1. **Fetch Story Document**
   - Step 1에서 받은 Story URL로 `notion-fetch` MCP tool 사용
   - Story 페이지의 전체 내용 가져오기

2. **Analyze Story Content**
   - Story 제목, ID
   - BDD 시나리오
   - 기능 상세 요구사항
   - TO BE 화면/플로우
   - 테이블/케이스 정보 등

3. **Extract Sprint Information**
   - Story의 properties에서 "Sprint 관리" 속성 확인
   - Sprint 정보가 있으면 추출하여 저장
   - 이후 Task 생성 시 이 Sprint 정보를 그대로 사용

### Important Notes

- Story에 링크된 Sprint 정보를 자동으로 가져와서 Task에 적용
- Sprint 정보가 없으면 사용자에게 확인 요청

---

## Step 4: Extract and Propose FE Tasks

Story 내용을 기반으로 FE 작업 단위로 분할하고 Task를 제안합니다.

### Workflow

1. **Analyze Story Content**
   - Story의 BDD 시나리오 분석
   - 기능 상세 요구사항 분석
   - 화면/플로우 다이어그램 분석
   - 테이블/케이스 분석
   - 기존 코드 구조 참고하여 작업 단위 분할

2. **Propose Tasks Based on Template Structure**
   - Step 2에서 추출한 템플릿의 섹션 구조를 사용
   - 각 Task별로 다음 정보 제안:
     - **Task 제목**: Story 내용을 기반으로 명확한 작업 단위로 분할
     - **템플릿 섹션별 내용**: 템플릿에서 추출한 각 섹션에 맞춰 Story 내용으로 채우기
       - Short description: 작업에 대한 간단한 설명
       - Proposed changed: 주요 변경 내용
       - How to test: 테스트 방법 (Optional)
       - ScreenShots: 스크린샷 (Optional)
       - 기타 템플릿에 있는 섹션들

3. **Display Task List**
   - 제안된 Task 목록을 사용자에게 표시
   - 각 Task의 제목과 주요 내용 요약 제공

### Important Notes

- 템플릿 구조는 동적으로 반영되므로, 템플릿이 변경되어도 자동으로 적용됨
- 하드코딩된 섹션 이름을 사용하지 않음
- Story 내용을 충실히 반영하여 Task 생성

---

## Step 5: User Confirmation and Modification

제안된 Task 목록을 사용자에게 보여주고 확인을 받습니다.

### Workflow

1. **Present Task List**
   - Step 4에서 제안한 Task 목록을 사용자에게 표시
   - 각 Task의 상세 내용도 함께 제공

2. **Request User Confirmation**
   > 제안된 Task 목록을 확인해주세요. 수정, 추가, 삭제가 필요하면 알려주세요.

3. **Handle User Feedback**
   - 사용자가 수정 요청 시: 해당 Task 내용 수정
   - 사용자가 추가 요청 시: 새로운 Task 추가
   - 사용자가 삭제 요청 시: 해당 Task 제거
   - 사용자가 승인 시: 다음 단계로 진행

4. **Final Confirmation**
   - 모든 Task에 대해 사용자 확인을 받은 후에만 다음 단계로 진행
   - 확인 없이는 Task 생성하지 않음

### Important Notes

- **무조건 사용자 확인 절차 필수**
- 사용자가 명시적으로 승인하기 전까지는 Task를 생성하지 않음

---

## Step 6: Create Tasks

확인된 Task들을 Notion 개발 Task 데이터베이스에 생성합니다.

### Workflow

1. **Get Current User Information**
   - Use `notion-get-users` MCP tool
   - Parameters: `{"user_id": "self"}`
   - 현재 로그인된 사용자의 ID와 정보 가져오기
   - 담당자로 사용할 사용자 ID 저장

2. **Access Database**
   - 개발 Task 데이터베이스의 data_source_id 사용: `collection://1d8a4e07-955b-811d-b9d5-000b189ca4a8`

3. **Create Each Task**
   - Use `notion-create-pages` MCP tool
   - 각 Task에 대해 다음 정보 설정:

   **Page Properties**:
   - **작업** (title): Task 제목
   - **담당자** (person): Step 1에서 가져온 현재 로그인된 사용자 ID
   - **파트** (select): FE (고정)
   - **Sprint 관리** (relation): Step 3에서 Story에서 추출한 Sprint 정보 사용
   - **Epic & Story (개발 Task)에 관계됨** (relation): Story 페이지 URL
   - **진행 상태** (status): 시작 전
   - **유형** (select): feature (기본값, 필요시 수정)

   **Page Content**:
   - Step 2에서 확인한 템플릿의 마크다운 구조를 그대로 사용
   - 각 섹션을 Step 4에서 제안한 Story 내용으로 채움
   - 빈 섹션은 템플릿 형식 유지
   - `resolved(github) #` 섹션은 그대로 유지 (나중에 PR 번호 연결용)

4. **Verify Creation**
   - 각 Task가 성공적으로 생성되었는지 확인
   - 생성된 Task의 URL을 사용자에게 제공

### Important Notes

- 템플릿 페이지의 내용 구조를 그대로 사용하여 일관성 유지
- 현재 로그인된 사용자를 담당자로 자동 설정 (하드코딩 없음)
- Story에 링크된 Sprint 정보를 자동으로 적용
- 템플릿의 섹션 구조를 유지하면서 Story 내용으로 채우기
- **Icon Limitation**: 
  - Notion MCP tools (`notion-create-pages`, `notion-update-page`)로는 페이지 아이콘을 프로그래밍 방식으로 설정할 수 없음
  - 데이터베이스 템플릿 설정에 따라 자동으로 아이콘이 적용되지 않음 (템플릿을 직접 사용하는 것이 아니라 properties와 content를 직접 지정하여 생성하기 때문)
  - 생성된 Task 페이지의 아이콘은 Notion UI에서 수동으로 설정해야 함

---

## Completion

모든 Task가 성공적으로 생성되면 사용자에게 완료 메시지를 표시합니다.

> ✅ Story에서 FE Task 생성이 완료되었습니다.
> 
> 생성된 Task:
> - [Task 1 제목](Task 1 URL)
> - [Task 2 제목](Task 2 URL)
> - ...
