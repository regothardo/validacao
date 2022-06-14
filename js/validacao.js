export function valida (input){
    const tipoDeInput=input.dataset.tipo

    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML='';
    }else{
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML= mostraMensagemDeErro(tipoDeInput,input);
    }
}

const tiposDeErro=[
    'valueMissing',
    'typeMismacth',
    'patternMismatch',
    'customError'
]

/*objeto*/
const mensagensDeErro= {
    
    nome:{
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email:{
        valueMissing: "O campo não pode estar vazio",
        typeMissmatch:"o email digitado não é válido"
    },
    senha:{
        valueMissing:'O campo de senha não pode estar vazio',
        patterMismatch:'A senha deve contar de 6 a 12 caracteres, pelo menos uma letra maiúscula, um número e não conter símbolos.'
    },
    dataNascimento:{
        valueMissing:'O campo data de nascimento não pode estar vazio',
        customError:'Você deve ser maior que 18 anos para se cadastrar'
    }

    


}

const validadores = {
    dataNascimento:input=> validaDataNacimento(input)
};

/*
retirado por não ser uma boa prática
const dataNascimento=document.querySelector('#nascimento');

dataNascimento.addEventListener('blur', (evento)=> {
    validaDataNacimento(evento.target);
});
*/

function mostraMensagemDeErro(tipoDeInput, input){
    let mensagem='';
    tiposDeErro.forEach(erro=>{
        if(input.validity[erro]){
            mensagem=mostraMensagemDeErro[tiposDeErro][erro];
        }
    })

    return mensagem;
}


function validaDataNacimento(input){
    const dataRecebida = new Date(input.value);
    let mensagem='';

    if(!maiorQue18(dataRecebida)){
        mensagem='Você deve ser maior que 18 anos para se cadastrar';
    }
    
    input.setCustomValidity(mensagem);
}

function maiorQue18(data){

    const dataAtual=new Date();
    const dataMais18= new Date((data.getUTCFullYear()+18), data.getUTCMonth(), data.getUTCDate());

    return dataMais18<=dataAtual;
}
