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

Revisão: luva preta segurando as laterais de um modelo em tom natural de gesso marfim, com poros e pequenas irregularidades de superfície. Substitui o grafite rejeitado pela usuária. Posição acima do nome preserva a leitura. Centro com opacidade 100% e bordas suaves nas duas versões.

Original editado com image_gen nativo (sem CLI): `/Users/lenoravitorino/.codex/generated_images/01a0f7a0-9088-77f3-9efb-dbe962d52bf8/exec-8454097e-6ce4-4a5a-bade-db0924e05097.png`.

Prompt final:

> Edit this supplied cutout photo. Preserve its exact framing, hand pose, silhouette, dental cast placement above center at upper right, and transparent background. Main correction: replace the artificial dark grey dental cast with a REAL natural warm off-white / pale ivory DENTAL STONE PLASTER study cast, including the teeth. It must look like an actual dental lab photograph, NOT CGI or a 3D render: chalky micro-porous gypsum, subtle tiny surface irregularities, realistic individually shaped cast teeth and natural shadow in the grooves. No polished plastic, no metallic surface, no grey teeth, no saturated yellow, no pink gums. Keep restrained soft directional photographic light and moderate exposure so highlights are not pure blown-out white. Improve the black nitrile glove photographic realism: thin fitted medical nitrile, fine subtle fingertip texture and irregular natural small folds, not thick rubber or perfectly smooth sculpted material. Hand continues holding the model by the sides between thumb and fingers, not on an open palm. Preserve original scale, diagonal gesture and all subject positions precisely, only improve natural materials and lighting. Entire subject fully opaque; genuine transparent alpha background. No typography, no logos, no symbols, no extra hands or objects.
