//TODO: Read menu
//const readMenu= (csv) =>{}
//TODO: parseMenu(.split)
//const parseMenu= (bigStr)=>{}
//TODO: Grouping [Lunch][Dinner][Dessert]
//const groupData= (rows)=>{}
//TODO: build pretty string (join all the array into one string)
//const buildPrettyMenuStr= (groupings)=>{}
//TODO: write menu.txt
//const writeMenu = (prettyMenuStr) => {}
const fs = require("fs");
const os = require("os");

const readMenu = (csv)=> {
    return new Promise((resolve, reject)=>{
        fs.readFile(csv,"utf8", (err, data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const parseMenu= (bigStr)=>{
    let menuList =[]
    let lines= bigStr.split(os.EOL)
    lines.forEach((line) => {
        const [mealType, mealName, mealQuantity, price] = line.split(",")
        menuList.push({mealType, mealName, mealQuantity, price})
    })
    return menuList
}

const groupData= (category) =>{
    let grouped={}
    category.forEach((meal) =>{
        const {mealType, mealName, mealQuantity, price} = meal
        if(grouped[mealType]== undefined){
            grouped[mealType]=[]
    }
    grouped[mealType].push({mealName, mealQuantity, price })
    
})
return grouped
}
const buildPrettyMenuStr =(groupings)=>{
    let beautifulStr=""
    for(let mealType in groupings){
        beautifulStr = beautifulStr + `*${mealType}*` +os.EOL 
         groupings[mealType].forEach(meal => {
            const { mealName, mealQuantity, price } = meal
            let purePriceN= price.replace("$","")
            let chargeP= (parseFloat(purePriceN) * 1.8).toFixed(2);
            beautifulStr += `$${chargeP} ${mealName}, ${mealQuantity} ${os.EOL}`
        })
        beautifulStr += os.EOL    }
    return beautifulStr
}
const writeMenu= (prettyMenuStr) =>{
    fs.writeFile("menu.txt", prettyMenuStr, (err)=>{
        if (err){
            console.log(err)
        }
        else {
            fs.readFile("menu.txt", "utf-8", function(err,data){
                 if (err){
                console.log(err)
                 }else{
                console.log(data.toString())
        }})}
    })
}
readMenu("menu.csv")
.then((bigStr)=>{
    const rows = parseMenu(bigStr);
    const groupings= groupData(rows);
    const prettyMenuStr= buildPrettyMenuStr(groupings);
    return writeMenu(prettyMenuStr);
}).catch(err=>{console.log(err)})

