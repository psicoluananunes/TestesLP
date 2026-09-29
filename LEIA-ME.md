# Site Luana Nunes

O site foi feito a partir do design `project/Luana Nunes - Site.dc.html`, em HTML, CSS e JavaScript puros, sem framework e sem etapa de build.

## O que tem aqui

| Caminho | Para que serve |
|---|---|
| `docs/` | O site final: `index.html`, `css/`, `js/` e `assets/` |
| `luana-nunes-hostinger.zip` | O conteúdo de `docs/` compactado, pronto para enviar à Hostinger |
| `luana-nunes-preview.html` | A prévia em **um único arquivo**, com imagens, CSS e JS embutidos, para mandar por WhatsApp ou e-mail |
| `build_preview.py` | Gera a prévia de novo depois de alguma mudança em `docs/` |

## Publicar na Hostinger

1. No hPanel, abra **Sites → Gerenciador de arquivos** e entre na pasta `public_html`.
2. Apague o `index.html` ou `default.php` padrão da Hostinger, se houver.
3. Envie o `luana-nunes-hostinger.zip`, clique nele com o botão direito e escolha **Extrair**, direto em `public_html`.
4. Confira se `index.html` ficou **dentro** de `public_html`, e não numa subpasta.
5. Ative o SSL (HTTPS) em **Segurança → SSL**. A agenda da Doctoralia e o vídeo precisam de HTTPS.

## Prévia

Mande o arquivo `luana-nunes-preview.html`. Ele abre em qualquer navegador, sem precisar de outros arquivos.

A agenda da Doctoralia, o feed do Instagram (Elfsight), o vídeo do YouTube e as fontes vêm da internet. Por isso eles podem não aparecer quando a prévia é aberta direto do celular ou do computador. O vídeo do YouTube costuma não abrir em arquivo local. Em todos esses casos a página mostra links alternativos ("Abrir no YouTube", "Abrir agenda em nova aba"). No site publicado, tudo carrega normalmente.

## Editar

- Os textos estão em `docs/index.html`.
- Cores e comportamento responsivo estão em `docs/css/style.css`.
- A navegação, o carrossel e a ampliação dos relatos estão em `docs/js/main.js`.

Depois de editar, rode `python3 build_preview.py` para atualizar a prévia e compacte de novo a pasta `docs/` para a Hostinger.

## Link de prévia pelo GitHub Pages

A pasta `docs/` também pode ser publicada pelo GitHub Pages, gerando um link de prévia em que o vídeo e a agenda funcionam. No GitHub, abra **Settings → Pages**. Em **Branch**, escolha `main` e a pasta `/docs`, e clique em **Save**. Em alguns minutos o link aparece nessa mesma página: `https://psicoluananunes.github.io/TestesLP/`.
