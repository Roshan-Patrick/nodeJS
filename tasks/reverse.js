let string1 = "Messi is the GOAT";
let array1 = string1.split(" ");



for(i=0;i<array1.length;i++){
    var newString = "";
    const str = array1[i];
    for(j=str.length -1;j>=0;j--){
        newString+=str.charAt(j);
    
    }
    array1[i] = newString

}
const reverse = array1.toString();
console.log("hello",reverse)
console.log(reverse.split(","));
console.log(reverse.split(",").join(" "))

let original = "Hello";
let reversed = original.split('').reverse();
console.log(reversed);




