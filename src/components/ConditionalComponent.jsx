export const ConditionalComponent = ({ children, condition, fallback = null }) => (
  condition ? children : fallback
);
