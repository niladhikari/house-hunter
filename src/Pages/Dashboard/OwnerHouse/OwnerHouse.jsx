import useAuth from "../../../Hooks/useAuth";

const OwnerHouse = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>
    </div>
  );
};

export default OwnerHouse;
