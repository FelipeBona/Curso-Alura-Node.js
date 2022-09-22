import chalk from 'chalk';

function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join)
}

async function checaStatus(listaUrls) {
    const arrStatus = await Promise.all(
        listaUrls.map(async (url) => {
            try {
                const response = await fetch(url)
                return Response.status;
            } catch (erro) {
                return manjeaErros(erro);
            }
        })
    )
    return arrStatus
}

function manjeaErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link nao encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

export default async function listaValidada(listaDelinks) {
    const links = extraiLinks(listaDelinks);
    const status = await checaStatus(links);
    console.log(status);

    return listaDelinks.map((objeto, indice) => ({

        ...objeto,
        status: status[indice]
    }))
}