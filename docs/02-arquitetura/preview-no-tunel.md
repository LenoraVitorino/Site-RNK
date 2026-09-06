# Preview ao vivo por túnel Cloudflare

Como expor o dev server do Astro numa URL pública, para mostrar o site a quem não
vai rodar nada na própria máquina.

> **O túnel roda na mesma máquina que o dev server.** Não dá para separar os dois:
> o cloudflared precisa alcançar `localhost:4321`, e o `localhost` de cada máquina
> é o dela. Um agente rodando em container remoto não serve para isso — e, no caso
> do container do Claude Code, nem conseguiria: a política de rede libera só HTTPS,
> e o cloudflared precisa de TCP na porta **7844**, que fica bloqueada. Isso vale
> inclusive para túnel nomeado com token: o bloqueio é de rede, não de autenticação.

## Os dois comandos

Em dois terminais, na pasta do projeto:

```bash
# 1 — o site
PREVIEW_HOST=preview.renkestudio.com.br npm run dev

# 2 — o túnel (nomeado, na sua conta)
cloudflared tunnel run <nome-do-tunel>
```

E no painel da Cloudflare, o *public hostname* do túnel aponta para
`http://localhost:4321`.

Para um teste rápido, sem configurar nada na conta, o túnel efêmero também serve —
ele imprime a URL `*.trycloudflare.com` que você usa como `PREVIEW_HOST`:

```bash
cloudflared tunnel --url http://localhost:4321
```

## Por que o `PREVIEW_HOST`

O Vite recusa requisição cujo cabeçalho `Host` ele não conhece. É proteção contra
*DNS rebinding*: sem ela, um site malicioso aberto no seu navegador conseguiria
falar com o seu dev server. O túnel chega com o domínio da Cloudflare, não com
`localhost`, então sem a variável a resposta é:

```
403 Blocked request. This host ("preview.renkestudio.com.br") is not allowed.
```

A variável faz duas coisas em `astro.config.mjs`:

| | Sem `PREVIEW_HOST` | Com `PREVIEW_HOST` |
|---|---|---|
| Interface | só `localhost` | todas (o túnel precisa alcançar) |
| Host do túnel | 403 | 200 |
| Host desconhecido | 403 | **403** |

A última linha é a que importa: a exceção é para **um** domínio, o seu. Não vale
trocar isso por `allowedHosts: true` — aí a proteção some inteira.

## O que fica exposto

Uma URL pública servindo o site do cliente antes do lançamento, com hot reload.
Vale lembrar:

- O dev server **não é servidor de produção**. Não tem cache, compressão nem
  rate limit, e devolve stack trace na tela quando algo quebra.
- Feche o túnel quando terminar de mostrar (`Ctrl-C` nos dois terminais).
- Se precisar de link durável e com controle de acesso, o caminho é publicar o
  build (`npm run build`) numa hospedagem, com Cloudflare Access na frente — não
  deixar o dev server no ar.
