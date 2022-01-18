var Publico_2018_cruzeiro = [49, 46, 46, 45, 44, 41, 40, 39, 38, 35]; //10 jogos com mais publico, cruzeiro 2018. escala 1=1000
var soma = 0; //inicialmente a soma esta em 0, por começar no primeiro termo q é o 0.





function setup() {
  createCanvas(400,400);

 
  for (var partidas = 0; partidas<Publico_2018_cruzeiro.length; partidas=partidas +1) {
 //quantidade de elementos < variavel com a matriz .lenght(tamanho) ; o intervalo da sequencia(de um em um, dois em dois etc.)
  soma=soma + Publico_2018_cruzeiro [partidas];
  //conforme a function setup for executada um total de 10x, que é, a quantidade de elementos na matriz, cada vez que ela for executada 
  //será somado um valor de cada elemento da matriz
 }
 var media_Publico_2018_cruzeiro = soma/Publico_2018_cruzeiro.length *1000;

console.log ("A media das 10 partidas com mais publico do Cruzeiro em 2018 foi de aproximadamente "+media_Publico_2018_cruzeiro+" pessoas.");
}


function draw() 
{
  background(30);
}
