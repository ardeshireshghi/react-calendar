export default function withClassName(WrappedComponent) {
  return ({ className, ...otherProps } = {}) => (
    <div className={className}>
      <WrappedComponent {...otherProps} />
    </div>
  );
}
