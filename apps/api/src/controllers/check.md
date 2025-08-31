generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String      @id @default(uuid())
  name          String
  email         String      @unique
  emailVerified Boolean
  image         String?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  firstLogin    Boolean     @default(true)
  plan          Plan        @default(FREE)
  
  sessions      Session[]
  accounts      Account[]
  workspaces    Workspace[] @relation("UserWorkspaces")
  
  @@map("user")
}

enum Plan {
  FREE
  PAID
}

model Workspace {
  id        String    @id @default(uuid())
  name      String
  slug      String    @unique // custom URL slug
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  // owner
  ownerId String
  owner   User @relation(fields: [ownerId], references: [id])

  // relations
  githubApps GithubAppInstallation[]
  members    User[] @relation("UserWorkspaces")
  pullRequests PullRequest[]

  @@map("workspace")
}

model GithubAppInstallation {
  id           String    @id @default(uuid())
  installationId String  // GitHub installation ID
  accountLogin  String   // GitHub org/user account name
  accountType   String   // "User" or "Organization"
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id])

  @@map("github_app_installation")
}

model PullRequest {
  id            String    @id @default(uuid())
  number        Int       // GitHub PR number
  title         String
  description   String?
  state         String    // open, closed, merged
  repoName      String
  branch        String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id])

  analyses Analysis[]

  @@map("pull_request")
}

model Analysis {
  id          String   @id @default(uuid())
  status      String   // e.g. "pending", "completed", "failed"
  reportUrl   String?  // link to a detailed report
  summary     String?  // high-level results
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  pullRequestId String
  pullRequest   PullRequest @relation(fields: [pullRequestId], references: [id])

  @@map("analysis")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?

  userId String
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("session")
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@map("account")
}

model Verification {
  id         String    @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime? @default(now())
  updatedAt  DateTime? @updatedAt

  @@map("verification")
}