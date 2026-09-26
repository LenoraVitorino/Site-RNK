"""
Gera os fundos dos planos do palco "Protocolo Revena" (26/09/2026).

Referência: tresmarescapital.com (cada solução tem uma imagem de fundo, em
tons de cinza, com traços finos). Aqui os traços contam a história do
Protocolo: a operação vai do caos à ordem, plano a plano.

  Start  traços curtos e soltos, em todas as direções (a operação sem estrutura)
  Run    os traços começam a se alinhar num fluxo
  Scale  linhas longas e paralelas que se abrem para a direita (crescimento)
  Core   as linhas convergem para o centro, onde fica o símbolo (conexão)
  Full   órbitas completas em volta do centro (a jornada inteira)

Saída: src/assets/palco/<plano>.webp, só os traços (grafite translúcido) sobre
fundo transparente; a cor de fundo continua a do CSS de cada plano.

  python3 scripts/gerar-fundos-palco.py
"""
import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter

L, A = 2400, 1500          # tamanho final (16:10; o CSS usa object-fit: cover)
S = 2                      # supersampling para suavizar as linhas
COR = (22, 22, 22)
SAIDA = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'palco')


def ruido(x, y, semente):
    """Campo suave e barato: soma de senos com fases da semente."""
    r = random.Random(semente)
    v = 0.0
    for _ in range(4):
        fx, fy, f = r.uniform(.6, 2.2), r.uniform(.6, 2.2), r.uniform(0, 6.28)
        v += math.sin(x * fx + y * fy + f)
    return v / 4


def tela():
    img = Image.new('RGBA', (L * S, A * S), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def traco(d, pontos, alfa, largura=1.0):
    if len(pontos) < 2:
        return
    d.line([(x * S, y * S) for x, y in pontos], fill=COR + (int(255 * alfa),), width=max(1, round(largura * S)), joint='curve')


def fluxo(d, semente, n, passos, alinhamento, abre=0.0, curto=False):
    """Linhas de fluxo num campo de ângulos; alinhamento puxa tudo para a horizontal."""
    r = random.Random(semente)
    for _ in range(n):
        x, y = r.uniform(-100, L + 100), r.uniform(-100, A + 100)
        pts = [(x, y)]
        a0 = r.uniform(0, 6.28)
        for k in range(passos):
            campo = ruido(x / 520, y / 520, semente) * math.pi
            alvo = (y - A / 2) / A * abre            # abre em leque para a direita
            ang = campo * (1 - alinhamento) + alvo * alinhamento
            if curto:
                ang = a0 + campo * .5
            x += math.cos(ang) * 7
            y += math.sin(ang) * 7
            pts.append((x, y))
        # Mais escuro no meio do traço, some nas pontas (luz de desenho a grafite).
        alfa = r.uniform(.08, .26)
        traco(d, pts, alfa, r.uniform(.7, 1.3))


def converge(d, semente, n):
    """Linhas que saem das bordas e fazem curva até perto do centro."""
    r = random.Random(semente)
    cx, cy = L / 2, A / 2
    for _ in range(n):
        ang = r.uniform(0, 6.28)
        raio = max(L, A) * .75
        x, y = cx + math.cos(ang) * raio, cy + math.sin(ang) * raio * .7
        pts = [(x, y)]
        giro = r.uniform(-.35, .35)
        for _ in range(260):
            dx, dy = cx - x, cy - y
            dist = math.hypot(dx, dy)
            if dist < r.uniform(260, 420):
                break
            a = math.atan2(dy, dx) + giro * min(1, dist / 900)
            x += math.cos(a) * 8
            y += math.sin(a) * 8
            pts.append((x, y))
        traco(d, pts, r.uniform(.08, .24), r.uniform(.7, 1.3))


def orbitas(d, semente, n):
    """Elipses concêntricas, levemente inclinadas e incompletas."""
    r = random.Random(semente)
    cx, cy = L / 2, A / 2
    for i in range(n):
        rx = 380 + i * r.uniform(16, 26)
        ry = rx * r.uniform(.42, .52)
        inc = r.uniform(-.28, -.18)
        inicio = r.uniform(0, 6.28)
        comp = r.uniform(3.6, 6.1)
        pts = []
        for k in range(220):
            t = inicio + comp * k / 219
            x, y = math.cos(t) * rx, math.sin(t) * ry
            pts.append((cx + x * math.cos(inc) - y * math.sin(inc), cy + x * math.sin(inc) + y * math.cos(inc)))
        traco(d, pts, r.uniform(.08, .24), r.uniform(.7, 1.2))


def salvar(img, nome):
    img = img.filter(ImageFilter.GaussianBlur(.6 * S)).resize((L, A), Image.LANCZOS)
    os.makedirs(SAIDA, exist_ok=True)
    caminho = os.path.join(SAIDA, f'{nome}.webp')
    img.save(caminho, 'WEBP', quality=82, method=6)
    print(caminho, os.path.getsize(caminho) // 1024, 'KB')


if __name__ == '__main__':
    img, d = tela(); fluxo(d, 11, 900, 9, 0, curto=True); salvar(img, 'start')
    img, d = tela(); fluxo(d, 23, 520, 60, .45); salvar(img, 'run')
    img, d = tela(); fluxo(d, 37, 420, 420, .9, abre=1.1); salvar(img, 'scale')
    img, d = tela(); converge(d, 41, 340); salvar(img, 'core')
    img, d = tela(); orbitas(d, 53, 48); salvar(img, 'full')
