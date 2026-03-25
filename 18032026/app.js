const frutas = ['manzana', 'pera', 'platano', 'jicama'];

frutas.forEach(fruta=>console.log(fruta));

frutas.forEach((fruta,index,array)=>{
    console.log(fruta);
    console.log(index);
    console.log(array);
})
;

