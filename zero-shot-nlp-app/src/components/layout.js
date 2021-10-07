export const Container = (props) => {
  return (
    <div className="md:container md:w-3/5 px-2 space-y-4">{props.children}</div>
  );
};
