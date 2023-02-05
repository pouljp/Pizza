let modalQt=1; 
let cart = [];
let modalKey = 0;

const c = (el) =>document.querySelector(el);
const cs = (el) =>document.querySelectorAll(el);

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key',index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key =e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt =1;
        modalKey = key;

        c('.pizzaBig img' ).src = pizzaJson[key].img;
        c('.pizzaInfo h1' ).innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc' ).innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice' ).innerHTML = pizzaJson[key].innerHTML = `R$ ${item.price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{

            if(sizeIndex ==2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQt;
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
            }, 200)
    });

    c('.pizza-area').append(pizzaItem);

});
//eventos do Modal


function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
    c('.pizzaWindowArea').style.display = 'none';
    }, 500);

}
cs('.pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);

});


// Botão de Menos e Mais .

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt ++;
    c('.pizzaInfo--qt').innerHTML = modalQt;

    
})
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1 ){
        modalQt --;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }

})

// Seleção das opções Pequeno, meiodio e Grande 

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});

// adicionar itens ao carrinho - ações 

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    // Qual a Pizza
    //console.log("pizza" + modalKey)
    // Qual o tamanho?
   //let size = c('.pizzaInfo--size.selected').getAttribute('data-key')
   //console.log(size)
    // Quantas pizzas?
    //console.log("Quantidade"+ modalQt)

    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex((item) => item.identifier == identifier);
    if(key > -1 ){

        cart[key].qt += modalQt


    }else {
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt

        });

    }
    updateCart();
    
    closeModal();

});

// atualizar carrinho 

function updateCart(){
    if(cart.length > 0){
        c('aside').classList.add('show')
        
    }else {
        
        c('aside').classList.remover('show')

    }

}



