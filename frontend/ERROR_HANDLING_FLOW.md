# Error Handling Flow Diagram

## Error Boundary Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                     ROOT ERROR BOUNDARY                          │
│  Catches: Theme/Router setup errors                             │
│  Behavior: Full-page error with home button                     │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │            COMPARISON PROVIDER BOUNDARY (Isolated)         │  │
│  │  Catches: Context provider errors                          │  │
│  │  Behavior: Shows error in content area                     │  │
│  │                                                             │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │     NAVIGATION BOUNDARY (Isolated)                    │ │  │
│  │  │  Catches: Navigation component errors                 │ │  │
│  │  │  Behavior: Shows error in nav area, rest works       │ │  │
│  │  │  ┌──────────────────────────────────────────────┐    │ │  │
│  │  │  │          Navigation Component              │    │ │  │
│  │  │  └──────────────────────────────────────────────┘    │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                             │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │        ROUTES BOUNDARY (Non-Isolated)                 │ │  │
│  │  │  Catches: Page component errors                       │ │  │
│  │  │  Behavior: Full-page error with retry/home           │ │  │
│  │  │  ┌──────────────────────────────────────────────┐    │ │  │
│  │  │  │  HomePage / SchoolDirectory / etc           │    │ │  │
│  │  │  │  (Individual pages can have own boundaries)  │    │ │  │
│  │  │  └──────────────────────────────────────────────┘    │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                             │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │      COMPARE BAR BOUNDARY (Isolated)                  │ │  │
│  │  │  Catches: Comparison feature errors                   │ │  │
│  │  │  Behavior: Shows error in compare bar only           │ │  │
│  │  │  ┌──────────────────────────────────────────────┐    │ │  │
│  │  │  │          CompareBar Component              │    │ │  │
│  │  │  └──────────────────────────────────────────────┘    │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

       OUTSIDE REACT (Not caught by error boundaries)
┌─────────────────────────────────────────────────────────────────┐
│  window.onerror - Uncaught JavaScript errors                     │
│  window.onunhandledrejection - Unhandled promise rejections     │
└─────────────────────────────────────────────────────────────────┘
```

## Error Propagation Flow

```
┌─────────────┐
│   Error     │
│  Occurs in  │
│  Component  │
└──────┬──────┘
       │
       v
┌──────────────────────────────────────────┐
│  Is error in React render/lifecycle?     │
└──────┬───────────────────┬────────────────┘
       │ YES               │ NO
       v                   v
┌─────────────────┐  ┌──────────────────────┐
│ Nearest Error   │  │ Is it async/event?   │
│ Boundary Catches│  └──────┬───────────────┘
└──────┬──────────┘         │
       │                    v
       │            ┌───────────────────────┐
       │            │ window.onerror or     │
       │            │ onunhandledrejection  │
       │            └───────────────────────┘
       │
       v
┌──────────────────────────────────────────┐
│  Is boundary isolated?                   │
└──────┬───────────────────┬───────────────┘
       │ YES               │ NO
       v                   v
┌─────────────────┐  ┌──────────────────────┐
│ Show error in   │  │ Show full-page error │
│ section only    │  │ with home/retry      │
└──────┬──────────┘  └──────┬───────────────┘
       │                    │
       └────────┬───────────┘
                v
        ┌───────────────┐
        │  User sees:   │
        │  - Error UI   │
        │  - Retry btn  │
        │  - Home btn   │
        └───────────────┘
```

## Error Recovery Flow

```
┌─────────────┐
│ Error State │
│   Active    │
└──────┬──────┘
       │
       v
┌──────────────────────────────────────────┐
│         User Action Required             │
└──────┬───────────────────┬───────────────┘
       │                   │
       v                   v
┌─────────────────┐  ┌──────────────────────┐
│ User clicks     │  │ User clicks          │
│ "Try Again"     │  │ "Go Home"            │
└──────┬──────────┘  └──────┬───────────────┘
       │                    │
       v                    v
┌─────────────────┐  ┌──────────────────────┐
│ resetError()    │  │ navigate('/')        │
│ called          │  │ called               │
└──────┬──────────┘  └──────┬───────────────┘
       │                    │
       v                    v
┌─────────────────┐  ┌──────────────────────┐
│ Error boundary  │  │ User navigates to    │
│ resets state    │  │ home page            │
└──────┬──────────┘  └──────┬───────────────┘
       │                    │
       v                    v
┌─────────────────┐  ┌──────────────────────┐
│ Component       │  │ New route loads      │
│ re-renders      │  │ successfully         │
└──────┬──────────┘  └──────┬───────────────┘
       │                    │
       └────────┬───────────┘
                v
        ┌───────────────┐
        │  Success or   │
        │  Same Error   │
        └───────┬───────┘
                │
                v
        ┌───────────────┐
        │ If same error:│
        │ Loop back to  │
        │ error state   │
        └───────────────┘
```

## Component Error Handling Pattern

```
┌─────────────────────────────────────────────────────────┐
│                    Your Component                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Data Fetching                                       │
│     ┌────────────────────────────────────┐             │
│     │ const { data, error, refetch } =   │             │
│     │   useFetchSchools()                │             │
│     └────────────────────────────────────┘             │
│                                                          │
│  2. Error Check                                         │
│     ┌────────────────────────────────────┐             │
│     │ if (error) {                        │             │
│     │   return <LoadingError              │             │
│     │     resource="schools"              │             │
│     │     onRetry={refetch}               │             │
│     │   />                                │             │
│     │ }                                   │             │
│     └────────────────────────────────────┘             │
│                                                          │
│  3. Render (wrapped in ErrorBoundary)                   │
│     ┌────────────────────────────────────┐             │
│     │ return (                            │             │
│     │   <ErrorBoundary isolate>           │             │
│     │     <SchoolList schools={data} />   │             │
│     │   </ErrorBoundary>                  │             │
│     │ )                                   │             │
│     └────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

## Error Type Decision Tree

```
                    ┌──────────────┐
                    │  Error Type  │
                    └───────┬──────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        v                   v                   v
┌───────────────┐  ┌────────────────┐  ┌──────────────┐
│ Data Fetch    │  │  Network       │  │  Component   │
│ Failed        │  │  Connectivity  │  │  Logic Error │
└───────┬───────┘  └────────┬───────┘  └──────┬───────┘
        │                   │                  │
        v                   v                  v
┌───────────────┐  ┌────────────────┐  ┌──────────────┐
│ LoadingError  │  │ NetworkError   │  │ErrorBoundary │
│ component     │  │ component      │  │ catches      │
└───────────────┘  └────────────────┘  └──────────────┘
        │                   │                  │
        └───────────────────┼──────────────────┘
                            │
                            v
                    ┌──────────────┐
                    │  User sees   │
                    │  appropriate │
                    │  error UI    │
                    └──────────────┘
```

## State Management During Errors

```
Normal State:
┌──────────────────────┐
│ hasError: false      │
│ error: null          │
│ Component: Rendering │
└──────────────────────┘

Error Occurs:
┌──────────────────────┐
│ hasError: true       │
│ error: Error object  │
│ Component: Hidden    │
│ Fallback: Visible    │
└──────────────────────┘

After Reset:
┌──────────────────────┐
│ hasError: false      │
│ error: null          │
│ Component: Re-render │
└──────────────────────┘
```

## Multi-Layer Protection

```
Layer 1: Try-Catch in Functions
  └─> Catches: Synchronous errors in functions
      └─> Fallback: Handle inline or setState

Layer 2: Promise .catch()
  └─> Catches: Async/await errors
      └─> Fallback: setState to error state

Layer 3: Error Boundaries
  └─> Catches: React render errors
      └─> Fallback: Error UI component

Layer 4: Global Handlers
  └─> Catches: Uncaught errors
      └─> Fallback: Log to tracking service

Layer 5: Error Tracking Service (Future)
  └─> Catches: All errors
      └─> Fallback: Developer notification
```

## Production Error Flow

```
┌─────────────────┐
│  Error Occurs   │
└────────┬────────┘
         │
         v
┌─────────────────────────────────────┐
│ 1. Error Boundary Catches           │
│    - Logs to console (dev mode)     │
│    - Shows user-friendly message    │
│    - Hides technical details        │
└────────┬────────────────────────────┘
         │
         v
┌─────────────────────────────────────┐
│ 2. onError Callback Fires           │
│    - Sends to Sentry/LogRocket      │
│    - Includes stack trace           │
│    - Includes user context          │
│    - Includes component stack       │
└────────┬────────────────────────────┘
         │
         v
┌─────────────────────────────────────┐
│ 3. Error Tracking Dashboard         │
│    - Developers notified            │
│    - Error grouped with similar     │
│    - Frequency tracked              │
│    - Impact assessed                │
└────────┬────────────────────────────┘
         │
         v
┌─────────────────────────────────────┐
│ 4. User Recovery Options            │
│    - Try Again (retry operation)    │
│    - Go Home (navigate away)        │
│    - Continue (isolated errors)     │
└─────────────────────────────────────┘
```

## Key Takeaways

1. **Multiple Layers**: Errors caught at appropriate level
2. **Isolated Failures**: Non-critical sections fail independently
3. **User Recovery**: Always provide clear recovery path
4. **Developer Tools**: Rich debugging info in development
5. **Production Ready**: Clean UIs and tracking integration hooks
6. **Graceful Degradation**: App continues working when possible
