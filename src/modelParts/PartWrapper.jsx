export function PartWrapper({children}){
  return <div>
    {children()}
  </div>;
}