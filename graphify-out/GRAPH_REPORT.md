# Graph Report - .  (2026-04-23)

## Corpus Check
- Corpus is ~17,900 words - fits in a single context window. You may not need a graph.

## Summary
- 131 nodes · 127 edges · 33 communities detected
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Architecture & Features|App Architecture & Features]]
- [[_COMMUNITY_Reptile Detail Page UI|Reptile Detail Page UI]]
- [[_COMMUNITY_Reptile Component & CRUD|Reptile Component & CRUD]]
- [[_COMMUNITY_Login Page UI|Login Page UI]]
- [[_COMMUNITY_Sign Up Page UI|Sign Up Page UI]]
- [[_COMMUNITY_API Client Layer|API Client Layer]]
- [[_COMMUNITY_Dashboard Component|Dashboard Component]]
- [[_COMMUNITY_Dashboard UI Widgets|Dashboard UI Widgets]]
- [[_COMMUNITY_Home Page & Features|Home Page & Features]]
- [[_COMMUNITY_Reptile Controller|Reptile Controller]]
- [[_COMMUNITY_Schedule Controller|Schedule Controller]]
- [[_COMMUNITY_Root & Auth Flow|Root & Auth Flow]]
- [[_COMMUNITY_Feeding Controller|Feeding Controller]]
- [[_COMMUNITY_Husbandry Controller|Husbandry Controller]]
- [[_COMMUNITY_Users Controller|Users Controller]]
- [[_COMMUNITY_App Entry Point|App Entry Point]]
- [[_COMMUNITY_API Hook|API Hook]]
- [[_COMMUNITY_Auth Hook|Auth Hook]]
- [[_COMMUNITY_Error Component|Error Component]]
- [[_COMMUNITY_Sign In Component|Sign In Component]]
- [[_COMMUNITY_Sign Up Component|Sign Up Component]]
- [[_COMMUNITY_Base Controller|Base Controller]]
- [[_COMMUNITY_Auth Middleware|Auth Middleware]]
- [[_COMMUNITY_Vite Build Tool|Vite Build Tool]]
- [[_COMMUNITY_React Framework|React Framework]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_App Bootstrap|App Bootstrap]]
- [[_COMMUNITY_Vite Types|Vite Types]]
- [[_COMMUNITY_Backend API Routes|Backend API Routes]]
- [[_COMMUNITY_Auth Routes|Auth Routes]]
- [[_COMMUNITY_Home Component|Home Component]]
- [[_COMMUNITY_Backend Entry Point|Backend Entry Point]]
- [[_COMMUNITY_JWT Types|JWT Types]]

## God Nodes (most connected - your core abstractions)
1. `Reptile Tracker Application` - 8 edges
2. `Manage Reptile Edit Page` - 7 edges
3. `Api` - 6 edges
4. `Reptile Tracker Home/Landing Page` - 6 edges
5. `Reptile Management Feature` - 5 edges
6. `Login Form` - 5 edges
7. `fetchData()` - 4 edges
8. `Dashboard Page` - 4 edges
9. `Reptile Entity (species, name, sex)` - 4 edges
10. `Login Page UI` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Hyperedges (group relationships)
- **Reptile Tracker Tech Stack** — readme_nextjs, readme_expressjs, readme_prisma, readme_yarn [EXTRACTED 1.00]
- **Reptile Tracker Application Features** — readme_feature_user_management, readme_feature_reptile_management, readme_feature_feeding_records, readme_feature_husbandry_records, readme_feature_scheduling [EXTRACTED 1.00]

## Communities

### Community 0 - "App Architecture & Features"
Cohesion: 0.18
Nodes (15): Backend Layer, Database, Express.js, Feeding Records Feature, Husbandry Records Feature, Reptile Management Feature, Scheduling Feature, User Management Feature (+7 more)

### Community 1 - "Reptile Detail Page UI"
Cohesion: 0.26
Nodes (12): Add Feeding Form, Add Husbandry Record Form, Add Schedule Form, Feeding Entity (food item), Feedings List Section, Husbandry Entity (length, weight, temp, humidity), Husbandry List Section, Manage Reptile Edit Page (+4 more)

### Community 2 - "Reptile Component & CRUD"
Cohesion: 0.24
Nodes (4): fetchData(), getAllFeedings(), getAllHusbandries(), getAllSchedules()

### Community 3 - "Login Page UI"
Cohesion: 0.36
Nodes (8): Email Input Field, Login Form, Login Page UI, Navigation Bar, Password Input Field, Reptile Tracker Application, Sign In Button, Sign Up Link

### Community 4 - "Sign Up Page UI"
Cohesion: 0.36
Nodes (8): Create Account Form, Login Button, Login Page, Navigation Bar, Reptile Tracker Application, Sign Up Button (Nav), Sign Up Page, User Registration

### Community 5 - "API Client Layer"
Cohesion: 0.48
Nodes (1): Api

### Community 6 - "Dashboard Component"
Cohesion: 0.29
Nodes (0): 

### Community 7 - "Dashboard UI Widgets"
Cohesion: 0.38
Nodes (7): Add New Reptile Form, Dashboard Page, Reptile Entry (name/species), Reptile List, Sign Out Button, Per-Reptile Task Entry, Today's Tasks Panel

### Community 8 - "Home Page & Features"
Cohesion: 0.43
Nodes (7): Feeding and Care Schedules Feature, Feeding Habits and Progress Tracking Feature, Health and Environment Data Feature, Reptile Management Feature, Reptile Tracker Home/Landing Page, Login Button, Sign Up Button

### Community 9 - "Reptile Controller"
Cohesion: 0.4
Nodes (0): 

### Community 10 - "Schedule Controller"
Cohesion: 0.5
Nodes (0): 

### Community 11 - "Root & Auth Flow"
Cohesion: 0.67
Nodes (0): 

### Community 12 - "Feeding Controller"
Cohesion: 0.67
Nodes (0): 

### Community 13 - "Husbandry Controller"
Cohesion: 0.67
Nodes (0): 

### Community 14 - "Users Controller"
Cohesion: 0.67
Nodes (0): 

### Community 15 - "App Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "API Hook"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Auth Hook"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Error Component"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Sign In Component"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Sign Up Component"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Base Controller"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Auth Middleware"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Vite Build Tool"
Cohesion: 1.0
Nodes (2): Reptile Tracker Client, Vite Build Tool

### Community 24 - "React Framework"
Cohesion: 1.0
Nodes (2): React, React Logo (SVG)

### Community 25 - "Vite Config"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "App Bootstrap"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Vite Types"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Backend API Routes"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Auth Routes"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Home Component"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Backend Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "JWT Types"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **12 isolated node(s):** `Yarn Package Manager`, `REST API`, `Database`, `Rationale: Prisma for DB Access`, `Sign Out Button` (+7 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `App Entry Point`** (2 nodes): `App()`, `App.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `API Hook`** (2 nodes): `useApi.ts`, `useApi()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Hook`** (2 nodes): `useAuth.ts`, `useAuth()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Error Component`** (2 nodes): `Error.tsx`, `Error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sign In Component`** (2 nodes): `SignIn.tsx`, `SignIn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sign Up Component`** (2 nodes): `SignUp.tsx`, `SignUp()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Base Controller`** (2 nodes): `controller()`, `controller.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Middleware`** (2 nodes): `authenticationMiddleware()`, `authentication.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Build Tool`** (2 nodes): `Reptile Tracker Client`, `Vite Build Tool`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React Framework`** (2 nodes): `React`, `React Logo (SVG)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Bootstrap`** (1 nodes): `main.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Types`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend API Routes`** (1 nodes): `api.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Routes`** (1 nodes): `auth.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Component`** (1 nodes): `Home.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Entry Point`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `JWT Types`** (1 nodes): `jwt.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 4 inferred relationships involving `Reptile Management Feature` (e.g. with `Feeding Records Feature` and `Husbandry Records Feature`) actually correct?**
  _`Reptile Management Feature` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Yarn Package Manager`, `REST API`, `Database` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._