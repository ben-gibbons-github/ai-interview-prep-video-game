import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-react-easy-button-label-0001',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Button Label)\n\nYou are building a `<SubmitButton>` component:\n\n```jsx\nfunction SubmitButton({ isLoading, label }) {\n  const text = /* your logic */\n  return <button>{text}</button>\n}\n```\n\nImplement `solve(props)` where `props = { isLoading: boolean, label: string }`. Return the text the button should display: `"Loading..."` when `isLoading` is true, otherwise `label`.',
    correctExplanation:
      'A simple conditional render: return a fallback string when loading, otherwise pass the label through. This is the most common controlled-text pattern in React buttons.',
    tests: [
      { input: [{ isLoading: true, label: 'Submit' }], expected: 'Loading...' },
      { input: [{ isLoading: false, label: 'Submit' }], expected: 'Submit' },
      { input: [{ isLoading: false, label: 'Save Changes' }], expected: 'Save Changes' },
    ],
  },
  {
    id: 'raw-coding-react-easy-conditional-class-0002',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Conditional className)\n\nYou are building a `<Card>` component:\n\n```jsx\nfunction Card({ selected, disabled }) {\n  const className = /* your logic */\n  return <div className={className}>...</div>\n}\n```\n\nImplement `solve(props)` where `props = { selected: boolean, disabled: boolean }`. Return the className string. Start with `"card"`. Append `" selected"` if selected. Append `" disabled"` if disabled. Order: card, selected, disabled.',
    correctExplanation:
      'Build the class string by starting from a base and conditionally appending modifiers. This is the standard pattern before libraries like `clsx`. Order matters for snapshot tests.',
    tests: [
      { input: [{ selected: true, disabled: false }], expected: 'card selected' },
      { input: [{ selected: false, disabled: true }], expected: 'card disabled' },
      { input: [{ selected: true, disabled: true }], expected: 'card selected disabled' },
    ],
  },
  {
    id: 'raw-coding-react-easy-list-item-keys-0003',
    difficulty: 'easy',
    prompt:
      'React Component Coding (List Item Keys)\n\nYou are rendering a list of items:\n\n```jsx\nfunction ItemList({ items }) {\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={/* your logic */}>{item.name}</li>\n      ))}\n    </ul>\n  )\n}\n```\n\nImplement `solve(props)` where `props = { items: { id: string, name: string }[] }`. Return an array of strings representing the `key` prop React would assign to each `<li>` — one string per item, using `item.id`.',
    correctExplanation:
      'React requires stable, unique keys for list items. The id field is the canonical choice. Return ids in the same order as the input array.',
    tests: [
      { input: [{ items: [{ id: 'a1', name: 'Alpha' }, { id: 'b2', name: 'Beta' }] }], expected: ['a1', 'b2'] },
      { input: [{ items: [] }], expected: [] },
      { input: [{ items: [{ id: 'z', name: 'Zeta' }] }], expected: ['z'] },
    ],
  },
  {
    id: 'raw-coding-react-easy-default-props-0004',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Default Prop Values)\n\nYou are building a `<Badge>` component:\n\n```jsx\nfunction Badge({ count = 0, max = 99 }) {\n  const display = /* your logic */\n  return <span>{display}</span>\n}\n```\n\nImplement `solve(props)` where `props = { count: number, max: number }`. Return the display string: `"${count}"` when count <= max, or `"${max}+"` when count exceeds max.',
    correctExplanation:
      'Badge overflow is a classic capped-display pattern in notification UIs. Compare count to max and format accordingly.',
    tests: [
      { input: [{ count: 5, max: 99 }], expected: '5' },
      { input: [{ count: 100, max: 99 }], expected: '99+' },
      { input: [{ count: 99, max: 99 }], expected: '99' },
    ],
  },
  {
    id: 'raw-coding-react-easy-event-handler-payload-0005',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Event Handler Payload)\n\nYou are building an `<InputField>` component:\n\n```jsx\nfunction InputField({ name, onChange }) {\n  return (\n    <input\n      onChange={e => onChange(/* your logic */)}\n    />\n  )\n}\n```\n\nImplement `solve(props)` where `props = { name: string, eventValue: string }`. Return the object that `onChange` should receive: `{ name, value }` where value is `eventValue`.',
    correctExplanation:
      'Controlled inputs in React commonly lift a named field + value pair so parent state can be updated generically without knowing the field name.',
    tests: [
      { input: [{ name: 'email', eventValue: 'user@example.com' }], expected: { name: 'email', value: 'user@example.com' } },
      { input: [{ name: 'username', eventValue: 'ada' }], expected: { name: 'username', value: 'ada' } },
      { input: [{ name: 'bio', eventValue: '' }], expected: { name: 'bio', value: '' } },
    ],
  },
  {
    id: 'raw-coding-react-easy-prop-spread-0006',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Prop Spread Filter)\n\nYou are building a `<StyledDiv>` wrapper that passes HTML-safe props to the underlying `<div>` but strips out internal component props:\n\n```jsx\nfunction StyledDiv({ variant, size, ...rest }) {\n  return <div {...rest} />\n}\n```\n\nImplement `solve(props)` where `props = { variant: string, size: string, [others]: any }`. Return an object with `variant` and `size` removed — just the remaining keys and values.',
    correctExplanation:
      'Prop-spreading with rest/spread is the standard React pattern for forwarding DOM props while keeping component-specific props internal.',
    tests: [
      { input: [{ variant: 'primary', size: 'lg', className: 'box', id: 'main' }], expected: { className: 'box', id: 'main' } },
      { input: [{ variant: 'secondary', size: 'sm', onClick: 'handler', 'data-testid': 'btn' }], expected: { onClick: 'handler', 'data-testid': 'btn' } },
      { input: [{ variant: 'ghost', size: 'md' }], expected: {} },
    ],
  },
  {
    id: 'raw-coding-react-easy-controlled-input-0007',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Controlled Input Value)\n\nYou are building a `<TextInput>` controlled component:\n\n```jsx\nfunction TextInput({ value, onChange }) {\n  return (\n    <input\n      type="text"\n      value={value}\n      onChange={e => onChange(e.target.value)}\n    />\n  )\n}\n```\n\nImplement `solve(props)` where `props = { value: string, newInputValue: string }`. The input receives a change event with `e.target.value = newInputValue`. Return the updated component state object: `{ value: string }`.',
    correctExplanation:
      'A controlled input stores its value in React state and updates via onChange. The parent manages state; the input is always a reflection of the component state.',
    tests: [
      { input: [{ value: 'hello', newInputValue: 'world' }], expected: { value: 'world' } },
      { input: [{ value: '', newInputValue: 'test' }], expected: { value: 'test' } },
      { input: [{ value: 'abc', newInputValue: '' }], expected: { value: '' } },
    ],
  },
  {
    id: 'raw-coding-react-easy-fragment-return-0008',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Fragment Return)\n\nYou are rendering multiple sibling elements without wrapping in a div:\n\n```jsx\nfunction Header() {\n  return (\n    /* your logic */\n  )\n}\n```\n\nImplement `solve(props)` where `props = { title: string, subtitle: string }`. Return an array of two string descriptions: `["<h1>" + title + "</h1>", "<p>" + subtitle + "</p>"]`.',
    correctExplanation:
      'Fragments allow returning multiple sibling elements without adding a wrapper div. This is essential for semantic HTML and avoiding extra DOM nodes.',
    tests: [
      { input: [{ title: 'Welcome', subtitle: 'Home' }], expected: ['<h1>Welcome</h1>', '<p>Home</p>'] },
      { input: [{ title: 'About', subtitle: 'Our Story' }], expected: ['<h1>About</h1>', '<p>Our Story</p>'] },
    ],
  },
  {
    id: 'raw-coding-react-easy-event-stoppropagation-0009',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Event stopPropagation)\n\nYou have nested click handlers:\n\n```jsx\nfunction Container() {\n  return (\n    <div onClick={() => log("container")}>\n      <button onClick={(e) => {\n        e.stopPropagation()\n        log("button")\n      }}>\n        Click me\n      </button>\n    </div>\n  )\n}\n```\n\nImplement `solve(input)` where `input = { callStopPropagation: boolean }`. If true, only "button" logs. If false, both log. Return `{ logs: string[] }` in order.',
    correctExplanation:
      'stopPropagation halts the React synthetic event from bubbling up to parent handlers. This prevents unwanted parent handler execution from child interactions.',
    tests: [
      { input: [{ callStopPropagation: true }], expected: { logs: ['button'] } },
      { input: [{ callStopPropagation: false }], expected: { logs: ['button', 'container'] } },
    ],
  },
  {
    id: 'raw-coding-react-easy-form-submit-0010',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Form Submit Data)\n\nYou are handling form submission:\n\n```jsx\nfunction LoginForm() {\n  function handleSubmit(e) {\n    e.preventDefault()\n    const data = extractFormData(e)\n  }\n}\n```\n\nImplement `solve(input)` where `input = { formElements: { email: { value: string }, password: { value: string } } }`. Return an object `{ email: string, password: string }` with the input values extracted.',
    correctExplanation:
      'Form data extraction uses input element values. preventDefault stops the default form submission so you can handle it with React state.',
    tests: [
      { input: [{ formElements: { email: { value: 'user@example.com' }, password: { value: 'secret123' } } }], expected: { email: 'user@example.com', password: 'secret123' } },
      { input: [{ formElements: { email: { value: '' }, password: { value: '' } } }], expected: { email: '', password: '' } },
    ],
  },
  {
    id: 'raw-coding-react-easy-forward-ref-0011',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Ref Forwarding)\n\nYou are wrapping a native `<input>` in a custom component:\n\n```jsx\nconst CustomInput = forwardRef(function CustomInput(props, ref) {\n  return <input ref={ref} {...props} />\n})\n```\n\nImplement `solve(input)` where `input = { refExposed: boolean }`. If refExposed is true, the parent can access the input DOM element. If false, the ref cannot pass through. Return `{ canAccessDOM: boolean }`.',
    correctExplanation:
      'By default, functional components don\'t forward refs. forwardRef explicitly passes the ref through to the child, allowing parent components to access the underlying DOM element.',
    tests: [
      { input: [{ refExposed: true }], expected: { canAccessDOM: true } },
      { input: [{ refExposed: false }], expected: { canAccessDOM: false } },
    ],
  },
  {
    id: 'raw-coding-react-easy-optional-children-0012',
    difficulty: 'easy',
    prompt:
      'React Component Coding (Optional Children)\n\nYou are building a wrapper component:\n\n```jsx\nfunction Card({ children, title }) {\n  return (\n    <div className="card">\n      {title && <h2>{title}</h2>}\n      <div>{children || "No content"}</div>\n    </div>\n  )\n}\n```\n\nImplement `solve(props)` where `props = { title: string | null, children: string | null }`. Return the rendered structure as an object: `{ hasTitle: boolean, content: string }`.',
    correctExplanation:
      'Conditional rendering of children and props is a core React pattern. Fallback text ("No content") handles when children is undefined or null.',
    tests: [
      { input: [{ title: 'Card Title', children: 'Card body' }], expected: { hasTitle: true, content: 'Card body' } },
      { input: [{ title: null, children: 'Card body' }], expected: { hasTitle: false, content: 'Card body' } },
      { input: [{ title: 'Title', children: null }], expected: { hasTitle: true, content: 'No content' } },
    ],
  },
]

export default data
