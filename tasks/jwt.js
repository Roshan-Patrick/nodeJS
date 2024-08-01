const jwt = require("jsonwebtoken");
const jwtPassword = "messi@123";
const zod = require("zod");

const emailSchema = zod.string().email();
const passswordSchema = zod.string().min(6);

function signJWT(username, password) {
  const usernameResponse = emailSchema.safeParse(username);
  const passwordResponse = passswordSchema.safeParse(password);

  if (!usernameResponse.success || !passwordResponse.success) {
    return null;
  }

  const signature = jwt.sign(
    {
      username,
    },
    jwtPassword
  );

  return signature;
}

function decodeJWT(token){
    if(jwt.decode(token)){
        return true
    }else{
        return false
    }
}

function verifyJWT(token){
    let ans = true;
    try{
        jwt.verify(token)
    }catch(e){
        ans = false;
    }
    return ans
}

// console.log(signJWT("messi@gmail.com","messi@123"));
// console.log(decodeJWT("eyJhdGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lc3NpQGdtYWlsLmNvbSIsImlhdCI6MTcyMjQwMjk4MH0.bo7sFMvzYuMcpZ6NVFWwRa-sbyOMBISnC-UqpjJV-7g"));
console.log(verifyJWT("eyJhdGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lc3NpQGdtYWlsLmNvbSIsImlhdCI6MTcyMjQwMjk4MH0.bo7sFMvzYuMcpZ6NVFWwRa-sbyOMBISnC-UqpjJV-7g"));
