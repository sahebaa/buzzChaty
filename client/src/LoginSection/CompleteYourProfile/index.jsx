import React, { useState,useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { MdPersonAdd } from "react-icons/md";
import hexColors from "../../assets/colorCodes";
import BirthDatePicker from './BirthdatePicker';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signInUser } from "../../services";

const index = () => {
  const navigate = useNavigate();
  const [addIcon, setAddIcon] = useState("false");
  const[bgColor,setBgColor]=useState(()=>{return localStorage.getItem("bgColor") ||  "#EDEADE"});
  const[year,setYear]=useState(()=>{return localStorage.getItem("signInPageYear") || ""});
  const[month,setMonth]=useState(()=>{return localStorage.getItem("signInPageMonth") || ""});  
  const[date,setDate]=useState(()=>{return localStorage.getItem("signInPageDate") || ''});
  const [bio,setBio]=useState(()=>{return localStorage.getItem('bio') || ""});
  const[imageSrc,setImageSrc]=useState(()=>{return localStorage.getItem("imageSrc") || ""});
  const [submitButtonLoading,setSubmitLoading]=useState(false);
  const[imageUploadng,setImageUploading]=useState(false);

  const cloudName=import.meta.env.VITE_CLOUD_NAME;
  //console.log("your cloundary nam",cloudName);

  const fileInputRef=useRef(null);

  const handleYearChange = (val) => {
    //console.log("here is your year value",val);
    localStorage.setItem("signInPageYear",val)
    setYear(val);
  };

  const handleMonthChange = (val) => {
    localStorage.setItem("signInPageMonth",val);
    setMonth(val);
  };

  const handleDateChange = (val) => {
    localStorage.setItem("signInPageDate",val)
    setDate(val);
  };

  const handleImageClick=()=>{
    fileInputRef.current.click();
    console.log("image has been clicked");
  }

  const handleFileChange=async(event)=>{
   // setImageUrl(event.target.files[0].name);
    //console.log(event.target.files[0].name);

    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setImageUploading(true);
    const formData=new FormData();
    formData.append("file",file);
    formData.append("upload_preset", "unsigned_preset");

    try{
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace with your Cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageSrc(data.secure_url);
      localStorage.setItem("imageSrc",data.secure_url);
      //console.log("Here your image searh",data);

    }catch(error){
    //  console.log("error ocured",error);
      toast.error("error in uploading imaage")
    }

  }

//hanndling complete signin steps

  const handleCompletSignin=async()=>{
    setSubmitLoading(true);
    console.log(year,month,date);
    const currDate=new Date();
    const currYear=currDate.getUTCFullYear()
    if(currYear-year<=5)
      return toast.error("you are minor you cannont create account");

    const user={
      name:localStorage.getItem('name'),
      lastName:localStorage.getItem('lastName'),
      email:localStorage.getItem('email'),
      bio:localStorage.getItem('bio') || bio,
      colorCode:localStorage.getItem("bgColor") || bgColor,
      profileImg:imageSrc,
      dateOfBirth:`${year}/${month}/${date}`,
      password:localStorage.getItem('password')
    }

    console.log(user);

    try{
      const response=await signInUser(user);
      console.log("Here is your response",response);
      //if(response.)
      setSubmitLoading(false);
      localStorage.removeItem('name');
      localStorage.removeItem('lastName');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('confirmPassword');
      localStorage.removeItem('bgColor');
      localStorage.removeItem('signInPageYear');
      localStorage.removeItem('signInPageMonth');
      localStorage.removeItem('signInPageDate');
      localStorage.removeItem('bio');
      localStorage.removeItem('imageSrc');

      const userObj=response?.data?.user;
      localStorage.setItem('logedInUserId',userObj.userId);
      localStorage.setItem('logedInUserName',userObj.name);
      localStorage.setItem('logedInUserLastName',userObj.lastName)
      localStorage.setItem('logedInUserEmail',userObj.email)
      localStorage.setItem('logedInUserColorCode',userObj.colorCode);
      localStorage.setItem('logedInUserProfileImg',userObj.profileImg);
      localStorage.setItem('logedInUserBio',userObj.bio);

      navigate("/signup/completeyourprofile/verify-your-email",{replace:true});

    }catch(error){
      console.log("Here is your eror",error.response.data.message);
      setSubmitLoading(false);
      const response=error.response.data.message
      toast.error(response);
    }
  }

  return (
    <div className="h-[100vh] w-[100%] bg-[#FFFFFF] flex items-center justify-center flex-col gap-[5vh]">
      <p className="text-4xl font-bold bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-transparent">
        Complete your profile
      </p>
      <div className="container shadow-xl rounded-2xl w-[60vw] pb-[5vh] flex items-center justify-center flex-col">
        <div className=" flex items-center justify-center gap-[5vw]">
        <Toaster/>
          <div className="image-upload basis-2/5  group cursor-pointer flex items-center justify-center flex-col gap-[3vh] relative h-[21vh] w-[1vh] rounded-full" style={{ backgroundColor: bgColor }} onClick={handleImageClick}>
            {
              (imageSrc?.trim().length<=0)?<MdPersonAdd className="h-[70%] w-[70%] text-black transition-colors duration-300" />: <img src={imageSrc} className="h-[100%] w-[100%] text-black rounded-full transition-colors duration-300"/>
            }

            {/* Gray overlay on hover */}
            <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full"></div>
            <input type="file"  ref={fileInputRef} onChange={()=>handleFileChange(event)} style={{ display: "none" }}/>
            {/* + Icon centered on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-4xl font-bold">+</span>
            </div>
          </div>

          <div className="p-[5vw] flex items-start justify-center gap-[2vh] flex-col">
            <div>
              <p>Birthdate</p>
            <BirthDatePicker onYearChange={handleYearChange} onMonthChange={handleMonthChange} onDateChange={handleDateChange}/>
            </div>
            <input
              type="text"
              className="border-2 border-gray-700 p-2 w-[100%] "
              placeholder="enter your bio"
              value={bio}
              onChange={(e)=>{let val=e.target.value; setBio(e.target.value); localStorage.setItem("bio",val)}}
            />
            <div className="hex-codes">
              {hexColors.map((hexColor, index) => (
                <div
                  key={index}
                  className="h-8 w-8 inline-block m-1 rounded cursor-pointer "
                  style={{ backgroundColor: hexColor }}
                  onClick={()=>setBgColor(hexColor)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <button className="bg-blue-500 text-black p-2 w-[10vw] cursor-pointer rounded-lg" onClick={handleCompletSignin}>
          {
            submitButtonLoading?"Loading...":<span>Complete Singin</span>
          }
        </button>
      </div>
    </div>
  );
};

export default index;
