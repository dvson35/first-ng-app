# Angular Todo App - Copilot Instructions

## Architecture Overview

This is a modern Angular 20+ application built with standalone components (no NgModules). The app demonstrates a todo list interface that fetches data from JSONPlaceholder API.

**Key architectural patterns:**
- **Standalone components**: All components use `standalone: true` and explicit `imports` arrays
- **Signal-based state**: Uses Angular signals (`signal()`) for reactive state management
- **Functional routing**: Lazy-loaded routes with `loadComponent()` in `app.routes.ts`
- **Inject function**: Dependency injection uses `inject()` function instead of constructor injection

## Component Structure & Conventions

### Component Organization
- Each component lives in its own folder: `component-name/component-name.{ts,html,css,spec.ts}`
- Components use class names (PascalCase) matching folder names: `Todo`, `Counter`, `Header`
- Selectors follow `app-` prefix convention: `app-todo-item`, `app-header`

### Signal Patterns
```typescript
// State management with signals
counterValue = signal(0);
todoItems = signal<Array<Todo>>([]);

// Updates use .set() for replacement, .update() for modification
this.todoItems.update((todos) => todos.map(todo => ({...todo, completed: !todo.completed})));
```

### Input/Output Pattern
```typescript
// Required inputs use input.required<T>()
todo = input.required<Todo>();
// Outputs use output<T>()
todoToggled = output<Todo>();
```

## Development Workflows

### Key Commands
- **Development server**: `npm start` or `ng serve` (runs on http://localhost:4200)
- **Build**: `npm run build` (outputs to `dist/`)
- **Unit tests**: `npm test` (Karma + Jasmine)
- **E2E tests**: `npx cypress open` (Cypress configured at http://localhost:4200)

### Testing Setup
- **Unit tests**: Co-located `.spec.ts` files using Jasmine
- **E2E tests**: Cypress in `cypress/e2e/` with Vietnamese comments for Copilot suggestions
- **Cypress config**: Viewport 1280x720, 10s timeout, video recording enabled

## Data Flow & Services

### Service Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class TodosService {
  http = inject(HttpClient); // Use inject() not constructor
  
  getTodosFromApi() {
    return this.http.get<Array<Todo>>('https://jsonplaceholder.typicode.com/todos');
  }
}
```

### Component-Service Integration
- Services injected with `inject()` function
- HTTP calls use RxJS operators (e.g., `catchError`)
- State updates via signal `.set()` and `.update()` methods

## Custom Features

### Directives
- `HighlightCompletedTodo`: Applies visual styling to completed todos using `effect()` for reactive DOM updates
- Uses `input()` for directive parameters and `ElementRef` for direct DOM manipulation

### Pipes
- `FilterTodosPipe`: Filters todo array by search term
- Pipe usage: `todoItems() | filterTodos : searchTerm()`

## Project-Specific Patterns

### Template Syntax
- Uses new control flow: `@if`, `@for` instead of `*ngIf`, `*ngFor`
- Signal interpolation: `{{ todoItems().length }}`
- Event binding to signal updates: `[(ngModel)]="searchTerm"`

### Routing
- Lazy loading with dynamic imports: `import('./todos/todos').then((m) => m.Todos)`
- Routes defined in `app.routes.ts`, not in modules

### Error Handling
- RxJS `catchError` operator for HTTP errors
- Console logging for debugging

## Configuration Notes

- **Angular 20+**: Uses latest Angular features and standalone architecture
- **TypeScript**: Strict mode enabled
- **Prettier**: Configured for Angular HTML parser
- **HttpClient**: Provided in `app.config.ts` via `provideHttpClient()`
- **Zone.js**: Event coalescing enabled for performance

When creating new components, follow the established patterns: standalone components, signal-based state, inject() for DI, and co-located file structure.