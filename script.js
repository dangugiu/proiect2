function descompunere(numar, valori, puteri)
{
    var i;
    
    if(numar <= 3)
    {
        for(j = 0; j <= valori.length ; j++)
        {
            if(valori[j] == numar)
            {
                puteri[j]++;
                return;
            }
        }

        valori[valori.length - 1] = numar;
        puteri[puteri.length - 1] = 1;
        /*valori.push(numar);
        puteri.push(1);*/
        valori.push(0);
        puteri.push(1);
        return;
    }

    for(i = numar - 2; i >= 2; i--)
    {
        if(numar % i == 0)
        {
            descompunere(numar / i, valori, puteri);
            descompunere(i, valori, puteri);
            return;
        }
    }

    for(j = 0; j < valori.length ; j++)
    {
        if(valori[j] == numar)
        {
            puteri[j]++;
            return;
        }
    }

    valori[valori.length - 1] = numar;
    puteri[puteri.length - 1] = 1;
    /*valori.push(numar);
    puteri.push(1);*/
    valori.push(0);
    puteri.push(1);
}

var valori = [];
var puteri = [];
var output = document.createElement("p");

document.getElementById("body").appendChild(output);

document.getElementById('button').addEventListener("click", function(){
    valori.push(0);
    puteri.push(1);
    numar = document.getElementById("input").value;
    descompunere(numar, valori, puteri);
    
    var string = numar + " = ";
    var ok = "";

    for(i = 0; i < valori.length - 1; i++)
    {
        string = string + ok + valori[i];
        if(puteri[i] > 1)
        {
            string = string + "^" + puteri[i];
        }
        ok=" * ";
    }

    //document.getElementById("output").innerHTML=string;
    output.innerHTML = string;

    valori.length = 0;
    puteri.length = 0;

})

document.getElementById('button2').addEventListener("click", function(){

    numar = document.getElementById("input").value;

    var nuumar = {
        value : numar
    }

    fetch('http://localhost:3000/data', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(nuumar)
    })
})

document.getElementById('button3').addEventListener("click", function(){
    valori.push(0);
    puteri.push(1);
    fetch('http://localhost:3000/data', {method: 'get'})
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
    
        // Examine the text in the response
        response.json().then(function(numar) {
            descompunere(numar.value, valori, puteri);
            
            var string =numar.value +  " = ";
            var ok = "";
        
            for(i = 0; i < valori.length - 1; i++)
            {
                string = string + ok + valori[i];
                if(puteri[i] > 1)
                {
                    string = string + "^" + puteri[i];
                }
                ok=" * ";
            }
        
            //document.getElementById("output").innerHTML=string;
            output.innerHTML = string;
        
            valori.length = 0;
            puteri.length = 0;})}


)

})


