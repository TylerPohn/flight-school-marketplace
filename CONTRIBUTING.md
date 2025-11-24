# Contributing to Flight School Marketplace

Thank you for your interest in contributing to the Flight School Marketplace! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

---

## Code of Conduct

### Our Standards

- **Be Respectful**: Treat all contributors with respect and professionalism
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Inclusive**: Welcome contributors of all backgrounds and skill levels
- **Be Patient**: Remember that everyone is learning and growing

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling, insulting, or derogatory remarks
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js**: Version 20.x or later (22.x recommended)
- **npm**: Version 9.x or later
- **Git**: Latest version
- **AWS Account**: For backend development (optional for frontend-only changes)
- **AWS CLI**: Configured with appropriate credentials
- **Code Editor**: VS Code recommended with the following extensions:
  - ESLint
  - TypeScript
  - Prettier (optional)

### Initial Setup

1. **Fork the repository**:
   - Click "Fork" button on GitHub
   - Clone your fork locally:
     ```bash
     git clone https://github.com/YOUR_USERNAME/flight-school-marketplace.git
     cd flight-school-marketplace
     ```

2. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/flight-school-marketplace.git
   ```

3. **Install dependencies**:
   ```bash
   # Frontend
   cd frontend
   npm install

   # CDK (for backend changes)
   cd ../cdk
   npm install
   ```

4. **Set up environment variables**:
   ```bash
   # Copy example files
   cp .env.example .env
   cp frontend/.env.example frontend/.env.local

   # Edit with your values
   ```

5. **Verify setup**:
   ```bash
   # Frontend
   cd frontend
   npm run dev

   # Should open on http://localhost:5173
   ```

---

## Development Workflow

### 1. Create a Feature Branch

```bash
# Ensure you're on master and up to date
git checkout master
git pull upstream master

# Create and checkout feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write clean, readable code following our [Code Standards](#code-standards)
- Add or update tests as needed
- Update documentation if you change functionality
- Test your changes thoroughly

### 3. Commit Your Changes

Follow our [Commit Message Guidelines](#commit-message-guidelines):

```bash
git add .
git commit -m "feat: add school comparison export feature"
```

### 4. Keep Your Branch Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Rebase your branch on master
git rebase upstream/master

# Resolve any conflicts if they occur
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Open a Pull Request

- Go to your fork on GitHub
- Click "Compare & pull request"
- Fill out the PR template (see below)
- Submit the pull request

---

## Pull Request Process

### PR Template

When opening a pull request, include:

```markdown
## Description
Brief description of what this PR does and why.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement
- [ ] Configuration/build changes

## Changes Made
- Bullet point list of specific changes
- Include any architectural decisions
- Note any dependencies added/removed

## Testing
- [ ] I have tested this locally
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested in different browsers (if frontend change)

## Screenshots (if applicable)
Add screenshots to demonstrate visual changes.

## Breaking Changes
If this is a breaking change, list what breaks and migration steps.

## Related Issues
Fixes #123
Relates to #456

## Checklist
- [ ] My code follows the code standards of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have updated the README.md if needed
```

### Review Process

1. **Automated Checks**: All PRs must pass CI checks:
   - ESLint (code quality)
   - TypeScript type checking
   - Tests (if applicable)
   - Build succeeds

2. **Code Review**: At least one maintainer will review your PR:
   - Expect feedback and suggestions
   - Be responsive to review comments
   - Make requested changes promptly

3. **Approval**: Once approved and checks pass:
   - Maintainer will merge your PR
   - Your contribution will be included in the next release

### PR Guidelines

- **Keep PRs focused**: One feature or fix per PR
- **Small is better**: Smaller PRs are easier to review and merge
- **Update your branch**: Rebase on master before requesting review
- **Respond to feedback**: Address all review comments
- **Be patient**: Reviews may take a few days

---

## Code Standards

### TypeScript

- **Use TypeScript**: All new code should be TypeScript
- **Strict mode**: Enable strict type checking
- **Type everything**: Avoid `any` - use proper types or `unknown`
- **Interfaces over types**: Prefer interfaces for object shapes

```typescript
// Good
interface SchoolProfile {
  schoolId: string;
  name: string;
  location: Location;
}

// Avoid
const school: any = {...};
```

### React

- **Functional Components**: Use function components, not class components
- **Hooks**: Use React Hooks for state and side effects
- **Props Types**: Always define prop interfaces

```typescript
// Good
interface SchoolCardProps {
  school: School;
  onSelect: (id: string) => void;
}

export function SchoolCard({ school, onSelect }: SchoolCardProps) {
  // Component logic
}
```

### Code Quality

- **ESLint**: Follow ESLint rules configured in `eslint.config.js`
- **No console.log**: Remove debug statements before committing
- **Error handling**: Always handle errors appropriately
- **Accessibility**: Follow WCAG 2.1 guidelines for UI components

### File Organization

```
frontend/src/
├── components/         # Reusable components
│   ├── matching/      # Feature-specific components
│   ├── comparison/
│   └── layout/
├── pages/             # Page components (one per route)
├── hooks/             # Custom React hooks
├── services/          # API services
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── context/           # React Context providers
└── schemas/           # Zod validation schemas
```

### Naming Conventions

- **Files**: PascalCase for components (`SchoolCard.tsx`), camelCase for utilities (`formatCurrency.ts`)
- **Components**: PascalCase (`SchoolCard`)
- **Functions**: camelCase (`calculateDistance`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_SCHOOLS`)
- **Interfaces**: PascalCase (`SchoolProfile`)
- **Props Interfaces**: ComponentNameProps (`SchoolCardProps`)

### CSS/Styling

- **Material-UI**: Use MUI components and theme
- **sx prop**: Use `sx` prop for component-specific styles
- **Theme**: Access theme via `useTheme()` hook
- **Responsive**: Use breakpoints from theme

```typescript
<Box
  sx={{
    padding: 2,
    backgroundColor: 'background.paper',
    [theme.breakpoints.down('sm')]: {
      padding: 1,
    },
  }}
>
```

### AWS/Backend

- **Lambda**: Use Node.js 20.x runtime
- **ESM**: Use ES modules (`.mjs` files)
- **Error handling**: Always catch and log errors
- **CORS**: Include CORS headers in all responses
- **CloudWatch**: Log useful debugging information

```javascript
export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    // Handler logic
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### CDK

- **TypeScript**: All CDK code in TypeScript
- **Constructs**: Use high-level (L2/L3) constructs when available
- **Naming**: Use descriptive resource names
- **Outputs**: Export important resource identifiers

---

## Branch Naming Conventions

Use the following prefixes for branch names:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks (dependencies, config)
- `hotfix/` - Urgent production fixes

**Examples**:
```
feature/school-comparison-export
fix/api-timeout-issue
docs/update-setup-instructions
refactor/matching-algorithm
test/add-school-card-tests
chore/update-dependencies
hotfix/cors-configuration
```

**Format**: `prefix/short-descriptive-name`

- Use lowercase
- Use hyphens to separate words
- Keep it concise but descriptive
- Reference issue number if applicable: `fix/123-api-timeout`

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, no logic changes)
- `refactor`: Code refactoring (no feat or fix)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (deps, config, build)
- `ci`: CI/CD configuration changes

### Scope (optional)

The section of the codebase affected:

- `frontend`: Frontend code
- `backend`: Lambda functions
- `cdk`: Infrastructure code
- `api`: API endpoints
- `matching`: Matching algorithm
- `comparison`: Comparison feature
- `ui`: UI components

### Subject

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Keep under 50 characters

### Body (optional)

- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

### Footer (optional)

- Reference issues: `Fixes #123` or `Closes #456`
- Note breaking changes: `BREAKING CHANGE: description`

### Examples

```bash
# Simple feature
git commit -m "feat: add export to CSV for school comparison"

# Bug fix with scope
git commit -m "fix(api): handle null values in match explanation"

# Feature with body
git commit -m "feat(matching): improve scoring algorithm precision

- Use decimal scores instead of integers
- Add tie-breaker for identical scores
- Improve budget matching with continuous scoring

Closes #234"

# Breaking change
git commit -m "feat(api): change match API response format

BREAKING CHANGE: Response now returns array of matches instead of object
Migration: Update client code to handle array response"

# Documentation
git commit -m "docs: add troubleshooting guide for AWS setup"

# Chore
git commit -m "chore(deps): update React to v19"
```

---

## Testing Requirements

### Frontend Testing

Currently, the project is setting up testing infrastructure. When contributing:

1. **Write tests for new features**:
   - Component tests for UI components
   - Hook tests for custom hooks
   - Integration tests for complex flows

2. **Run tests locally**:
   ```bash
   cd frontend
   npm test
   npm run test:coverage
   ```

3. **Maintain coverage**:
   - Aim for 70%+ coverage
   - Cover critical paths and edge cases

### Test Structure

```typescript
// SchoolCard.test.tsx
import { render, screen } from '@testing-library/react';
import { SchoolCard } from './SchoolCard';

describe('SchoolCard', () => {
  it('should render school name', () => {
    const school = { name: 'Test School', /* ... */ };
    render(<SchoolCard school={school} />);
    expect(screen.getByText('Test School')).toBeInTheDocument();
  });

  it('should call onSelect when clicked', () => {
    const onSelect = jest.fn();
    const school = { schoolId: '123', /* ... */ };
    render(<SchoolCard school={school} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith('123');
  });
});
```

### Manual Testing

Before submitting PR:

- [ ] Test in Chrome, Firefox, and Safari
- [ ] Test on mobile (responsive design)
- [ ] Test with network throttling (slow 3G)
- [ ] Test error states (API failures)
- [ ] Test edge cases (empty data, max limits)

---

## Documentation

### When to Update Documentation

Update documentation when you:

- Add new features
- Change existing functionality
- Add new environment variables
- Modify API endpoints
- Change deployment process
- Add dependencies

### Documentation Locations

- **README.md**: Project overview, setup, features
- **docs/TROUBLESHOOTING.md**: Common issues and solutions
- **docs/RUNBOOK.md**: Operational procedures
- **Code comments**: Complex logic, algorithms, workarounds
- **API docs**: API endpoint documentation
- **Component docs**: JSDoc comments for complex components

### Documentation Standards

- **Clear and concise**: Use simple language
- **Examples**: Provide code examples where helpful
- **Up to date**: Keep docs in sync with code
- **Consistent formatting**: Follow existing doc structure

### JSDoc Comments

Use JSDoc for complex functions and utilities:

```typescript
/**
 * Calculates distance between two geographic coordinates using Haversine formula
 *
 * @param lat1 - Latitude of first point in decimal degrees
 * @param lon1 - Longitude of first point in decimal degrees
 * @param lat2 - Latitude of second point in decimal degrees
 * @param lon2 - Longitude of second point in decimal degrees
 * @returns Distance in miles
 *
 * @example
 * const distance = calculateDistance(33.7490, -84.3880, 34.8526, -82.3940);
 * console.log(distance); // ~145 miles
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Implementation
}
```

---

## Additional Guidelines

### Performance Considerations

- **Lazy load**: Use React.lazy for code splitting
- **Memoization**: Use useMemo and useCallback appropriately
- **Debounce**: Debounce expensive operations (search, API calls)
- **Pagination**: Implement pagination for large datasets
- **Image optimization**: Use appropriate formats and sizes

### Security Considerations

- **No secrets in code**: Never commit API keys, credentials, or secrets
- **Environment variables**: Use environment variables for sensitive data
- **Input validation**: Validate all user inputs
- **XSS prevention**: Sanitize user-generated content
- **CORS**: Configure CORS appropriately (not `*` in production)

### Accessibility (a11y)

- **Semantic HTML**: Use appropriate HTML elements
- **ARIA labels**: Add labels for screen readers
- **Keyboard navigation**: Ensure all features work with keyboard
- **Color contrast**: Meet WCAG AA standards (4.5:1)
- **Alt text**: Provide alt text for images

### Mobile Responsiveness

- **Test on mobile**: Verify on small screens
- **Touch targets**: Minimum 44px touch targets
- **Breakpoints**: Use theme breakpoints
- **Performance**: Optimize for mobile networks

---

## Questions and Support

### Where to Ask Questions

- **GitHub Discussions**: General questions about the project
- **GitHub Issues**: Bug reports and feature requests
- **Email**: tylerpohn@gmail.com for private inquiries

### Before Asking

1. Check existing documentation
2. Search closed issues
3. Review troubleshooting guide
4. Try to reproduce the issue

### Creating Good Issues

When reporting bugs:

- **Clear title**: Describe the issue concisely
- **Steps to reproduce**: List exact steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, browser, Node version
- **Screenshots**: If applicable
- **Error messages**: Copy full error text

When requesting features:

- **Use case**: Explain why this is needed
- **Proposed solution**: Describe your idea
- **Alternatives**: List other approaches considered
- **Mockups**: Include designs if applicable

---

## Recognition

All contributors will be recognized in:

- GitHub contributors list
- Release notes
- Project credits

Thank you for contributing to Flight School Marketplace!

---

**Last Updated**: November 2024
**Version**: 1.0
