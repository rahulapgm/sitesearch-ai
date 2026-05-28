# SiteSearch AI

AI-powered website intelligence platform that converts any webpage into searchable RAG context and generates useful outputs like SEO metadata, product summaries, FAQs, affiliate copy and marketing content.

## Why I Built This

Manually reading product pages, extracting useful information, and rewriting it for SEO or marketing is repetitive. SiteSearch AI automates this flow using a full-stack AI pipeline.

## Features

- Analyze any website URL
- Convert webpage content into vector-searchable context
- Generate SEO metadata
- Generate product summaries
- Generate FAQs
- Generate affiliate/marketing copy
- Support custom user prompts
- Predefined prompt buttons from UI
- End-to-end flow from frontend to AI worker

## Architecture

```txt
Next.js Frontend
      ↓
NestJS API Gateway
      ↓
Python AI Worker
      ↓
LangChain Web Loader
      ↓
Text Chunking
      ↓
Gemini Embeddings
      ↓
Supabase pgvector
      ↓
Semantic Retrieval
      ↓
Gemini LLM
      ↓
Generated Result
```

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Context API

### Backend
- NestJS
- Node.js child process orchestration

### AI Worker
- Python
- LangChain
- Gemini API
- Supabase pgvector

### Database
- Supabase Postgres
- pgvector extension

## RAG Pipeline

```txt
URL
↓
Load webpage content
↓
Split content into chunks
↓
Create embeddings using Gemini
↓
Store embeddings in Supabase pgvector
↓
Retrieve relevant chunks based on user query
↓
Generate final answer using Gemini LLM
```

## Local Setup

### 1. Clone Repository

```bash
git clone <repo-url>
cd sitesearch-ai
```

### 2. Frontend Setup

```bash
cd apps/web
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

### 3. API Setup

```bash
cd apps/api
npm install
npm run start:dev
```

API runs on:

```txt
http://localhost:4000
```

### 4. Python AI Worker Setup

```bash
cd apps/ai-worker
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Environment Variables

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### `apps/ai-worker/.env`

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_API_KEY=your-google-api-key
USER_AGENT=SiteSearchAI/1.0
```

## Supabase Setup

Enable pgvector and create the documents table:

```sql
create extension if not exists vector;

create table documents (
  id uuid primary key,
  content text,
  metadata jsonb,
  embedding vector(3072)
);

create or replace function match_documents (
  query_embedding vector(3072),
  match_count int default null,
  filter jsonb default '{}'
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

## API Contract

### Analyze Website

```http
POST /analyze
```

Request:

```json
{
  "url": "https://www.apple.com/in/iphone-17/",
  "query": "Generate SEO metadata for this product page"
}
```

Response:

```json
{
  "success": true,
  "result": "Generated AI output"
}
```

## Example Use Cases

- Product page summarization
- SEO metadata generation
- FAQ generation
- Affiliate content generation
- Instagram ad copy
- Website knowledge extraction

## Project Structure

```txt
sitesearch-ai/
  apps/
    web/
    api/
    ai-worker/
  packages/
    shared/
  docs/
```

## Future Improvements

- Add authentication
- Add saved analysis history
- Add queue-based background jobs
- Add better JSON response parsing
- Add screenshot previews
- Add Skyblue UI component library integration
- Deploy frontend on Vercel
- Deploy API + Python worker on Render/Railway

## Author

Built by Rahul Arunachalam.

