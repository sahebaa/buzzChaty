const userRes = await Users.aggregate([
  { $match: { email: user } }, // Step 1: Find the user

  { $lookup: {               // Step 2: Join Chats
    from: "chats",
    localField: "chats",
    foreignField: "_id",
    as: "userChats"
  }},

  { $unwind: "$userChats" }, // Step 3: Unwind array to work with each chat

  { $lookup: {               // Step 4: Find latest message for each chat
    from: "messages",
    let: { messageIds: "$userChats.messages" },
    pipeline: [
      { $match: { $expr: { $in: ["$_id", "$$messageIds"] } } },
      { $sort: { timestamp: -1 } },
      { $limit: 1 },
      { $lookup: {              // Step 5: Add sender info
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "senderInfo"
      }},
      { $unwind: "$senderInfo" },
      { $project: {
        messageType: 1,
        messageContent: 1,
        timestamp: 1,
        "senderInfo.name": 1,
        "senderInfo.email": 1
      }}
    ],
    as: "lastMessage"
  }},

  { $addFields: {
    "userChats.lastMessage": { $arrayElemAt: ["$lastMessage", 0] }
  }},

  { $addFields: {             // Step 6: Filter to find the *other* user
    "userChats.otherUserId": {
      $filter: {
        input: "$userChats.users",
        as: "uid",
        cond: { $ne: ["$$uid", "$_id"] }
      }
    }
  }},

  { $lookup: {               // Step 7: Lookup the *other* user info
    from: "users",
    localField: "userChats.otherUserId",
    foreignField: "_id",
    as: "userChats.otherUser"
  }},

  { $group: {
    _id: "$_id",
    name: { $first: "$name" },
    email: { $first: "$email" },
    userChats: { $push: "$userChats" }
  }}
]);

--------------------------------------------------------------------------------------------------------------
##### req params in https request ######

In Express (Node.js), the req (request) object represents the incoming HTTP request from the client. It contains a lot of useful information you can use to process the request.

✅ Common Properties of req (Request Object)
✅Property	Description
req.body-	Contains data sent in the body (used with POST, PUT). Requires middleware like express.json() or body-parser.
req.params=Route parameters from the URL, e.g. /users/:id → req.params.id
req.query=Query string parameters, e.g. ?page=2&limit=10 → req.query.page
req.headers=All HTTP request headers. Example: req.headers['authorization']
req.cookies=	If using cookie-parser middleware, holds cookies sent by client
req.method=	The HTTP method (e.g., GET, POST, PUT)
req.url=	Full URL of the request
req.path=	Path of the request (e.g., /api/users)
req.ip=	IP address of the client
req.user=	Often set manually in auth middleware to attach the logged-in user's info
req.files=	Used for file uploads (requires middleware like multer)
req.originalUrl	Original request URL (helpful for redirects/logging)
✅ Example Usage
app.post('/user/:id', (req, res) => {
  console.log('Body:', req.body);       // POST data (e.g., { name: "John" })
  console.log('Params:', req.params);   // { id: '123' }
  console.log('Query:', req.query);     // e.g., ?debug=true
  console.log('Headers:', req.headers); // e.g., authorization token
  console.log('User:', req.user);       // Set by auth middleware
});


 res.cookie('token',authToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


-------------------------------------------------------------------------------------------------------------------------
###### Image uploading when input is hidden #######

1.Take reference of the current input ref
<input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={handleFileChange}
  style={{ display: "none" }}
/>


make call on div click
<div onClick={handleDivClick}>

inside handleDivClick make call to the fileInputref.current.click()

const handleDivClick = () => {
  fileInputRef.current.click();
};


inside the function make the value accessible

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
  }
};

uploading image to cluodinary

✅ Step-by-Step: Upload Image to Cloudinary from React

Step 1: Create a Cloudinary Account
Go to https://cloudinary.com
Sign up or log in.
Once logged in, go to your Dashboard.
Note down:
Cloud name → needed for API endpoint
You won't need the API key/secret for client-side upload using unsigned preset
Step 2: Create an Unsigned Upload Preset
In your Cloudinary dashboard, go to:
Settings → Upload → Upload presets
Click “Add upload preset”
Set:
Preset name: something like unsigned_preset
Signing Mode: Unsigned
Upload options: Allow images
Save the preset.
Step 3: Setup React Project
In your React project, make sure you have this structure ready:
File input (hidden)
Div to show image preview or placeholder
Image upload handler


const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true); // show spinner or disable UI

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // replace with your unsigned preset

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setImageSrc(data.secure_url); // final image URL from Cloudinary
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };


-----------------------------------------------------------------------------------------------------------------------------

✅✅ react useState + LocalStorage 
1: at the time of setting value to state onClick((e)=>{let val=e.target.value; setPassword(val); localStoage.setItem("passwrod":val)});

at the time of checking of the values to set in usestate

const [password,setPassowrd]=useState(()=>{return localStorage.getItem("password")|| ''});

-----------------------------------------------------------------------------------------------------------------------------

✅✅ At the time of login user should come back to credentials
navigate("/home", { replace: true });0


---------------------------------------------------------------------------------------------------------------------------
###### Better handling of the redirection of the routes #######

 (
    async function () {
      try{
        const response=await checkLogin(userId);
        //redirect to chat page
        if (response.authenticated) {
          // Redirect to home
          window.location.href = '/all-chats';
      } else {
          // Redirect to login
          window.location.href = '/login';
      }

      }catch(error){
        console.log(error);
        setLoading(false);
      }
    }
  )()