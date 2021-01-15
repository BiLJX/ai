import express, { json } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import NeuralNetwork from "./test/brain.js"
const brain = new NeuralNetwork(100, 66, 1)

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json())
app.get("/", (req, res) => {
	res.send("howww")
})


let data = []
app.post("/submit", (req, res)=>{
    res.send("good")
    const body = req.body.arr[0].split(',').map(x=>+x)
    data.push({
        input: body,
        target: [parseInt(req.body.target) ]
    })
})

function getResult(data_arr){
    const pred =  [15, 39, 83, 149, 174, 168, 136, 73, 138, 160, 153, 136, 144, 140, 120, 76, 43, 87, 114, 115, 91, 82, 102, 111, 98, 80, 84, 100, 106, 93, 49, 5, 21, 43, 85, 112, 110, 82, 66, 57, 40, 16, 20, 43, 62, 66, 78, 92, 82, 47, 15, 38, 75, 83, 66, 38, 26, 26, 35, 46, 34, 10, 3, 8, 5, 41, 60, 55, 32, 39, 54, 58, 43, 39, 39, 45, 45, 55, 94, 106, 93, 65, 64, 66, 40, 6, 0, 18, 30, 29, 28, 17, 26, 55, 55, 31, 0, 0, 0, 0]
    for(let j = 0; j < 10000; j++){
        for(let i = 0; i<data_arr.length; i++){
            brain.train(data_arr[i].input, data_arr[i].target)
        }
    }
    let result = brain.predict(pred)
    console.log(result)
    if(result<0.5){
        return "1D - 18 "+result 
    }else{
        return "nurko - faith "+result
    }
}

app.get("/result", (req, res)=>{
    let result = "200"
    setTimeout(()=>{
        res.send({
            "value": result
        })
    }, 25000)
    result = getResult(data)
})





app.listen(process.env.PORT||3000, () => console.log("listening at port 3000..."))
