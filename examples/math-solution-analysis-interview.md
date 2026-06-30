# Example: Conversation-First Planning Process

This example shows the process Ask Me Plan is designed to create: the agent asks, the user answers, the agent summarizes, then asks the next round based on what became clearer.

이 예시는 완성된 기획서가 아니라, 대화를 통해 기획이 점점 구체화되는 과정을 보여준다.

## Starting Request

User:

> 수학 풀이과정 분석 서비스를 만들고 싶어. 정답만 보는 게 아니라 학생이 어디서 막히는지 보고 싶어. 계속 질문해줘.

Agent should not immediately produce a full specification. It should start an interview.

## Round 1: Product Intent

Agent:

1. 이 서비스의 첫 번째 가치는 정답률을 올리는 것에 가까워, 아니면 오개념의 위치를 찾는 것에 가까워?
2. 첫 사용자는 학생, 교사, 학부모 중 누구로 잡을까?
3. 모든 수학 영역을 다룰까, 아니면 첫 MVP는 특정 학년/단원으로 좁힐까?

User:

> 핵심은 정답률보다 오개념의 위치를 찾는 거야. 첫 사용자는 학생과 교사. 처음엔 초등학교 5학년 분수로 좁히자.

Agent summary:

- Confirmed: The product is a process-diagnosis tool, not a generic answer checker.
- Confirmed: First users are students and teachers.
- Confirmed: MVP starts with grade 5 fractions.
- Next ambiguity: what fraction concepts, what student input, and what teacher report.

## Round 2: Learning Scope

Agent:

1. 5학년 분수 중에서 첫 10문항은 어떤 흐름이면 좋을까?
2. 학생의 풀이 과정을 글로 쓰게 할까, 선택/조작 중심으로 볼까?
3. 교사는 첫 화면에서 학생별 상세를 먼저 봐야 할까, 반 전체 오개념 요약을 먼저 봐야 할까?

User:

> 동치분수, 통분, 덧셈/뺄셈, 문장제 순서가 좋아. 학생은 조작형과 선택형 이유 중심으로 하고, 짧은 서술은 선택 사항. 교사는 반 전체 오개념 요약이 먼저 나왔으면 좋겠어.

Agent summary:

- Confirmed: First set sequence is equivalent fractions -> common denominators -> addition/subtraction -> word problems.
- Confirmed: Student input is manipulation + selected reason + optional short text.
- Confirmed: Teacher first screen is class-wide misconception summary.
- Assumption: 10 diagnostic questions are enough for the first demo unless the user says otherwise.
- Next ambiguity: what manipulation tool and how much behavior data to collect.

## Round 3: Interaction Model

Agent:

1. 첫 조작 도구는 분수막대, 수직선, 타일, 직접 필기 중 무엇이 좋아?
2. 학생 화면은 한 화면에 전체 풀이를 보여줄까, 한 번에 한 판단씩 넘길까?
3. 학생이 막힐 때 바로 힌트를 줄까, 아니면 "모르겠음"도 진단 신호로 남길까?

User:

> 분수막대가 좋아. 한 번에 한 판단씩 넘기는 게 좋고, 모르겠음은 진단 신호로 남기고 싶어. 처음부터 버튼을 보여주진 말고 30초 후에 보여줘.

Agent summary:

- Confirmed: First manipulation tool is fraction bars.
- Confirmed: Student flow uses one decision per screen.
- Confirmed: "I don't know" appears after 30 seconds, not immediately.
- Confirmed: "I don't know" is diagnostic data, not only a help trigger.
- Next ambiguity: whether students can go back and how the progress indicator should work.

## Round 4: UI Behavior

Agent:

1. 학생이 이전 단계로 돌아갈 수 있어야 할까?
2. 돌아간 기록은 교사용 진단 데이터로 쓸까?
3. 진행률은 숫자로 보여줄까, 아니면 작은 진행 막대만 보여줄까?

User:

> 이전 단계로 돌아갈 수 있어야 해. 그 기록도 진단 데이터로 쓰자. 진행률은 숫자 말고 작은 막대만 보여줘. 막대는 화면 최상단 중앙. 이전 단계 버튼은 왼쪽 위 아이콘만, 접근성 라벨은 있어야 해.

Agent summary:

- Confirmed: Students can go back to previous steps.
- Confirmed: Backtracking is teacher-facing diagnostic data.
- Confirmed: Progress is a small bar at top center with no numbers or step names.
- Confirmed: Back button is icon-only at top left with an accessibility label.
- Next ambiguity: what data can be sent to AI and what students can see after completion.

## Round 5: Privacy and Reporting

Agent:

1. AI API에는 원자료를 보낼까, 익명화된 요약 로그만 보낼까?
2. 진단 결과를 학생에게도 보여줄까, 교사에게만 보여줄까?
3. 교사용 문장은 어떤 톤이어야 해?

User:

> DeepSeek을 쓰되 개인정보는 보내지 말고 익명화된 요약 로그만 보내. 진단 결과는 학생에게 보여주지 말고 교사만 보게 하자. 교사용 문장은 짧고 직접적이어야 해.

Agent summary:

- Confirmed: DeepSeek is used only for limited teacher-facing summary generation.
- Confirmed: No personal data is sent to the AI API.
- Confirmed: Detailed diagnosis is hidden from students.
- Confirmed: Teacher copy should be concise, direct, and actionable.

## Resulting Planning State

Confirmed decisions:

- Product identity: math thinking diagnosis engine, not answer checker.
- MVP user: students and teachers.
- MVP scope: grade 5 fractions.
- First concepts: equivalent fractions, common denominators, addition/subtraction, word problems.
- First diagnostic set: 10 questions.
- Student flow: one decision per screen.
- First tool: fraction bars.
- Fraction-bar interaction: choose base/piece count and auto-generate the bar.
- Student input: manipulation, selected reason, optional short text.
- "I don't know": appears after 30 seconds and advances without immediate hint.
- Back navigation: top-left icon button with accessibility label.
- Progress: small top-center bar, no numeric labels.
- Teacher first screen: class-wide misconception summary.
- AI use: DeepSeek for anonymized teacher summary only.

Assumptions:

- Teachers value quick interpretation more than long reports.
- Reducing writing burden is important for grade 5 students.
- Direct drag-and-drop may mix device-control difficulty with math understanding, so it is better as a later experiment.

Open questions:

- What are the exact 10 sample problems?
- What data schema should store each checkpoint?
- Which teacher report filters are necessary in the MVP?
- What is the visual direction for student and teacher surfaces?

## Why This Is a Good Ask Me Plan Example

This process shows why the skill exists:

- The agent did not assume the product from the first sentence.
- The user did not need to write a complete specification upfront.
- Each answer became a concrete product decision.
- The agent kept asking only where ambiguity still mattered.
- The final plan can become an implementation prompt without losing the user's intent.

