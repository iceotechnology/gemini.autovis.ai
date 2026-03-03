#!/bin/bash

# ============================================
# Deploy - gemini.autovis.ai (PM2)
# Chỉ cần chạy: ./deploy.sh
# ============================================

set -euo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}🚀 Deploying gemini.autovis.ai...${NC}"
echo ""


# 2. Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
if command -v pnpm &> /dev/null; then
  pnpm install
else
  npm install
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"

# 3. Build production
echo -e "${BLUE}🔨 Building production...${NC}"
if [ -d "dist" ]; then
  rm -rf dist
fi

if command -v pnpm &> /dev/null; then
  NODE_ENV=production pnpm build
else
  NODE_ENV=production npm run build
fi
echo -e "${GREEN}✅ Build complete${NC}"

# 4. Create logs dir
mkdir -p logs

# 5. Start or reload PM2
echo -e "${BLUE}🔄 Starting PM2...${NC}"
if pm2 describe gemini-watermark-remover > /dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs
  echo -e "${GREEN}✅ PM2 reloaded${NC}"
else
  pm2 start ecosystem.config.cjs
  echo -e "${GREEN}✅ PM2 started${NC}"
fi

# 6. Save PM2 process list
pm2 save

echo ""
echo -e "${GREEN}🎉 Done! App running on port 3006${NC}"
echo ""
