#!/bin/bash

# Skills and Agents Sync Script
# 프로젝트 내의 .agents 폴더 내용을 .cursor, .claude, .gemini, .codex 폴더에 심링크합니다.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/.agents"

# 동기화할 대상 폴더 목록
TARGET_DIRS=(
  "$SCRIPT_DIR/.cursor"
  "$SCRIPT_DIR/.claude"
  "$SCRIPT_DIR/.gemini"
  "$SCRIPT_DIR/.codex"
)

echo "🔄 Syncing .agents contents to AI editor directories..."

# 원본 디렉토리 확인
if [ ! -d "$SOURCE_DIR" ]; then
  echo "⚠️ 원본 폴더인 ${SOURCE_DIR}가 존재하지 않습니다."
  # 기존에 .agent 폴더가 있다면 안내
  if [ -d "$SCRIPT_DIR/.agent" ]; then
    echo "💡 팁: 기존 .agent 폴더가 발견되었습니다. 폴더 이름을 .agents로 변경(mv .agent .agents) 후 실행해주세요."
  fi
  exit 1
fi

for TARGET_DIR in "${TARGET_DIRS[@]}"; do
  target_name=$(basename "$TARGET_DIR")
  echo "📦 Processing $target_name..."
  
  # 대상 폴더 생성
  mkdir -p "$TARGET_DIR"

  # .agents 안의 모든 항목(파일/폴더)에 대해 심링크 생성
  for item in "$SOURCE_DIR"/*; do
    # 항목이 존재하는지 확인 (* 글로빙 실패 방지)
    [ -e "$item" ] || continue
    
    name=$(basename "$item")
    target_item="$TARGET_DIR/$name"

    # 기존 대상이 심링크라면 덮어쓰기 위해 삭제
    if [ -L "$target_item" ]; then
      rm "$target_item"
    # 심링크가 아닌 실제 파일/폴더라면 경고 후 패스 (데이터 유실 방지)
    elif [ -e "$target_item" ]; then
      echo "  ⚠️ Warning: $target_item 은(는) 실제 파일/폴더입니다. 건너뜁니다."
      continue
    fi

    # 심링크 생성
    ln -s "$item" "$target_item"
    echo "  ✅ Linked: $name -> $target_name/$name"
  done
done

echo ""
echo "✨ Done!"