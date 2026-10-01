# Teste editorial dos planos — 01/10/2026

Geradas com a ferramenta nativa image_gen (sem CLI), como fotografias editoriais sintéticas e decorativas. Os PNGs com transparência foram convertidos para WebP com alpha usando Sharp, sem alteração do conteúdo. Não representam clientes nem procedimentos reais.

Padrão: abertura clara e planos escuros, com diagramação original e imagens. Comparação sem fotografias: `?planos=claro`. Mesmos assets nas versões estudio e copy; textos preservados. Start: seringa; Run e Core: mãos; Scale: mãos com luvas pretas passando tesoura cirúrgica; Full: mão com luva preta segurando modelo dentário. O estetoscópio foi retirado a pedido da usuária.

Composição: símbolo amarelo, fotografia sobre parte dele e nome do plano à frente de ambos. Abertura clara e fundos dos planos em grafite. Posições e dimensões originais do palco preservados. No desktop do estudio, o SVG existente mantém sua montagem; no celular e na copy, o componente compartilhado une o símbolo amarelo e a fotografia. A foto fica com 100% de opacidade; o nome claro permanece à frente da composição.

## seringa

Asset: `public/imagens/planos-editoriais/seringa.webp`.

Prompt final:

> Use case: ads-marketing. Create a premium medical editorial photographic asset for a high-end clinic operations website. One anatomically realistic hand wearing a matte black nitrile glove, emerging from the bottom left, delicately holding a clear small aesthetic medicine syringe angled upward toward upper right, needle visible but no contact with skin. Square composition, subject fully readable with ample negative space around it. Monochrome grayscale, subtle silver highlights, soft directional studio light, tactile real photography, calm and refined. Isolated on a genuinely transparent background. No text, no logos, no yellow, no decorative graphics, no blood, no extra fingers, no dramatic glow. This is a standalone cutout asset, not a website or poster mockup.

## maos

Asset: `public/imagens/planos-editoriais/maos.webp`.

Prompt final:

> Use case: ads-marketing. Create a premium editorial photographic cutout for an aesthetic medicine website. Two anatomically realistic graceful adult hands approaching one another with a small gap between fingertips: a hand in matte black medical nitrile glove enters diagonally from upper left, a bare hand enters diagonally from lower right. Gentle elegant gesture suggesting care and precision, no touching face or procedure. Square composition, central negative space, refined black-and-white photography with restrained silver highlights and soft light, natural skin texture. Isolated on a genuinely transparent background. No text, no logos, no yellow, no extra hands or fingers, no jewelry, no sci-fi glow. Standalone photographic asset, not a mockup.

## tesoura

Asset: `public/imagens/planos-editoriais/tesoura.webp`.

Revisão: edição direta da referência enviada pela usuária, com luvas pretas e recorte transparente. Mantém o gesto horizontal da entrega. Aplicação em Scale com `opacity: 1`, foto ampliada em 20% e a mesma máscara radial das demais fotos: centro opaco e bordas suavemente apagadas nas duas versões. Símbolo, nomes e diagramação preservados.

Referência: `/var/folders/f3/2x5sz53x3gbbnvjpqz48wpxc0000gn/T/codex-clipboard-2689b730-d759-43a7-872b-34809b9106ff.png`.

Original editado com image_gen nativo (sem CLI): `/Users/lenoravitorino/.codex/generated_images/01a0f7a0-9088-77f3-9efb-dbe962d52bf8/exec-9cda38a3-f355-4f5a-bfdf-db702656f31c.png`.

Prompt final:

> Edit the supplied photograph directly, preserving the EXACT pose, silhouette, finger positions, proportions, camera viewpoint, instrument, and relationship of the two hands. Do not invent a different handoff. Left hand enters horizontally from the left, palm partly facing viewer, fingers curled around the scissors rings. Right hand enters from upper right, back of hand facing viewer, holding the SAME slim instrument near its tip. Preserve the shallow nearly horizontal angle of the scissors, NOT a steep diagonal. Change only the white medical gloves to realistic matte BLACK nitrile gloves, retaining all folds and directional studio highlights, and make visible blue sleeve cuffs black as well. Remove the black background to genuine transparent alpha so this can overlay a website symbol. The hands and scissors themselves must be fully opaque, alpha 100%, no fading or translucent edges except normal antialiasing. Preserve full source hand shapes, do not add fingers or objects. Crop excess empty space above and below into a square transparent canvas without changing the original handoff geometry: both wrists still meet opposite left and right canvas edges, the scissors transfer is centered. Photorealistic surgical editorial photo, no text, no logos, no extra graphics. Fidelity to the supplied image is the priority.

## modelo-dentario

Asset: `public/imagens/planos-editoriais/modelo-dentario.webp`.

Revisão: gesto delicado de pinça com luva preta segurando as laterais do modelo, em diagonal. Modelo inteiro em cinza grafite fosco para preservar o contraste do nome branco. Substitui a palma aberta com modelo branco. Mantém opacidade 100% no centro e máscara suave nas bordas, nas duas versões.

Original gerado com image_gen nativo (sem CLI): `/Users/lenoravitorino/.codex/generated_images/01a0f7a0-9088-77f3-9efb-dbe962d52bf8/exec-5b50421d-6bd6-46eb-84ef-b47a882929c0.png`.

Prompt final:

> Use case: ads-marketing. Premium medical editorial photographic cutout, square transparent canvas. A single anatomically realistic slender adult hand in fitted matte BLACK nitrile medical glove rises diagonally from lower left and delicately GRIPS a small dental arch study model by its lateral base edges between thumb and curved index/middle fingers. Back/side of the glove faces the camera, graceful precise pinch grip similar to a clinician holding a small syringe; remaining fingers naturally curl inward. Absolutely NOT an open palm, NOT a tray-like hand with an object resting on top. The dental cast is a recognizable horseshoe dental arch with individually modeled teeth, made entirely from matte medium-dark GRAPHITE GREY dental model resin, INCLUDING the teeth; no white, ivory, cream, pink, shiny metal or bright areas. Subtle soft grey rim highlights define tooth anatomy without brightness. Model seen in three-quarter side/top view, gently tilted diagonally toward upper right, placed above center around x62% y30%; glove below center around x42% y65%. Model is compact, no more than one-third frame width; overall gesture is long, light and diagonal, plenty of negative space around. True realistic refined monochrome studio photography with natural delicate glove wrinkles, restrained soft directional light, low-key exposure, comparable to black-gloved aesthetic injection editorial photography. No huge frontal palm, no oversized prosthesis, no floating object, no other hand, no extra fingers, no syringe, no text, no logos or graphics, no yellow. Fully opaque subject on genuine transparent alpha background. Intended for overlay behind white typography on charcoal with a yellow abstract symbol; do NOT include that typography or symbol. Standalone photo asset only.
