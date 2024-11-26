import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse( localStorage.getItem('flexi_user'));
  const userName = `${user.firstName} ${user.lastName}`;

  console.log("name",user);
  

  return (
    <div className="h-[74px] w-full bg-[#143869] sticky top-0 flex items-center justify-end px-[114px]">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/admin/profile')}>
        <p className="text-[#FFFFFF] text-[18px] font-medium m-0">Welcome Back, {userName}</p>

        <div className="w-[40px] h-[40px] rounded-full bg-[#FFFFFF]/50 flex items-center justify-center">
          <User size={24} color="#143869" />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
