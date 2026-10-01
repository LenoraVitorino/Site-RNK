# Teste editorial dos planos — 01/10/2026

Geradas com a ferramenta nativa image_gen (sem CLI), como fotografias editoriais sintéticas e decorativas. Os PNGs com transparência foram convertidos para WebP com alpha usando Sharp, sem alteração do conteúdo. Não representam clientes nem procedimentos reais.

Padrão: abertura clara e planos escuros, com diagramação original e imagens. Comparação sem fotografias: `?planos=claro`. Mesmos assets nas versões estudio e copy; textos preservados. Start: seringa; Run: mãos; Core: duas mãos com luvas pretas segurando espelho e sonda odontológicos; Scale: mãos com luvas pretas passando tesoura cirúrgica; Full: mão única com luva preta segurando uma prótese fina em tom natural. O estetoscópio foi retirado a pedido da usuária.

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

## protese-dentaria

Asset: `public/imagens/planos-editoriais/protese-dentaria.webp`.

Mão única com luva preta entrando da diagonal inferior esquerda, segurando prótese implantossuportada em tom natural com gengiva rosada, baseada na nova referência da usuária. Preserva escala de 82%, com rotação de 12° para acentuar a diagonal, centro opaco e bordas suaves nas duas versões. Sem bloco de gesso.

Referência: `/var/folders/f3/2x5sz53x3gbbnvjpqz48wpxc0000gn/T/codex-clipboard-1d1fb972-d8f9-4e28-a0a4-af921b7a9a53.png`.

Original editado com image_gen nativo (sem CLI): `/Users/lenoravitorino/.codex/generated_images/01a0f7a0-9088-77f3-9efb-dbe962d52bf8/exec-6bb9f612-f8d6-4199-baf2-3b3c27214a86.png`.

Refinamento proporcional: somente a prótese reduzida aproximadamente 15% em relação à mão, mantendo pose, enquadramento e estilos existentes.

Prompt final de refinamento (sobre a imagem anterior):

> Make ONE small localized proportional correction to the supplied transparent image: reduce ONLY the entire dental prosthesis (teeth plus pink gingival band and implant fittings) to about 85% of its current linear size relative to the unchanged hand. The user wants it only slightly smaller, not tiny. Preserve exactly the same black-gloved hand, wrist, pose, diagonal angle, size, lighting, glove texture, canvas dimensions and transparent background. Keep the same realistic natural ivory teeth, pink gingiva, shape, orientation, details and photographic material of the prosthesis, simply a little smaller. Anchor its left contact near the index fingertip and keep a believable thumb/index grip; make only the smallest necessary fingertip adjustment so the reduced prosthesis remains held, not floating. Do not shrink the whole image, do not enlarge the hand, do not change composition, colors or background. No text, no new objects, no second hand. Genuine transparent alpha background, subject fully opaque.

## instrumentos-dentarios

Asset: `public/imagens/planos-editoriais/instrumentos-dentarios.webp`.

Core: duas mãos em diagonais opostas, com luvas pretas, aproximando espelho e sonda odontológicos. Foto espelhada horizontalmente via CSS: mão superior à direita e inferior à esquerda, ocupando a diagonal oposta ao título. Símbolo e textos preservados. Substitui a foto repetida do Run para dar uma imagem própria a cada plano. Escala compartilhada, centro opaco e bordas suaves, nas duas versões.

Original gerado com image_gen nativo (sem CLI): `/Users/lenoravitorino/.codex/generated_images/01a0f7a0-9088-77f3-9efb-dbe962d52bf8/exec-d5fbcf91-7e07-4bec-9104-f20765c698a1.png`.

Prompt final:

> Use case: ads-marketing. Create a refined photorealistic editorial cutout for a premium medical website, square canvas on genuinely transparent alpha background. TWO anatomically realistic adult hands in fitted matte BLACK medical nitrile gloves approach each other diagonally, each delicately holding one real dental instrument. Upper LEFT hand enters from upper left, wrist angled downward inward, holds a slim stainless-steel DENTAL MIRROR by its fine knurled handle, small round mirror head near center slightly above. Lower RIGHT hand enters from lower right, wrist angled upward inward, holds one slim stainless-steel DENTAL EXPLORER/PROBE, tiny curved hook tip approaching center slightly below mirror with a small gap. Two tools clearly separate, NOT crossed or tangled, hands never touching. Asymmetric balanced diagonal gesture like clinicians coordinating instruments, not a surgical-scissors handoff. Hands at natural modest scale, neither palm open toward camera; refined relaxed fingertip pinch grips, short visible wrist portions, no large forearms, no giant fingers. Mirror and probe heads meet near the central third, with negative space around; each glove occupies about a quarter of the frame, not the whole frame. Monochrome black gloves and subtly reflective brushed silver instruments, accurate realistic tool geometry. Real photographic macro detail, fine nitrile texture and natural wrinkles, soft controlled studio light, no CGI look, no glossy rubber, no dramatic glows. Enough restrained edge light to read black gloves on a charcoal website. Entire subject opaque, genuinely transparent background, no text, logos, sleeves of other colors, extra fingers, extra hands, extra tools, teeth, patients, blood or decorative graphics. Ample margins around the subjects, only wrists may leave frame corners. Standalone image asset, not a website mockup.
