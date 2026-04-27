
//* any type : noImplecitAny
let name: any;

//* unknown
// typesafe version of any
function render(document: unknown){
    if(typeof document === "string"){}
    if(typeof document === "string" && document.endsWith(".jpg")){}
}


//* never type
// values that never occur

function propose(message: string){
throw new Error()
}

propose("....")