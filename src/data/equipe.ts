/**
 * Time da Renke (04/10/2026), para o Faça parte. Fotos da pasta do estúdio
 * (Site Renke/drive-download…), recortadas em quadrado de 960px. O nome é o
 * do arquivo. A foto do Gui veio igual à da Geise e ficou de fora até chegar
 * a certa; a do Igor veio do arquivo bruto da câmera (prévia de 1920px).
 */
import type { ImageMetadata } from 'astro';
import andersonAlmeida from '../assets/equipe/anderson-almeida.jpg';
import andre from '../assets/equipe/andre.jpg';
import brito from '../assets/equipe/brito.jpg';
import dani from '../assets/equipe/dani.jpg';
import duda from '../assets/equipe/duda.jpg';
import gabrielLima from '../assets/equipe/gabriel-lima.jpg';
import geise from '../assets/equipe/geise.jpg';
import igor from '../assets/equipe/igor.jpg';
import isa from '../assets/equipe/isa.jpg';
import julioCaldeira from '../assets/equipe/julio-caldeira.jpg';
import lari from '../assets/equipe/lari.jpg';
import lucasCampos from '../assets/equipe/lucas-campos.jpg';
import maria from '../assets/equipe/maria.jpg';
import milena from '../assets/equipe/milena.jpg';
import pedroJoffily from '../assets/equipe/pedro-joffily.jpg';
import pedroPackness from '../assets/equipe/pedro-packness.jpg';
import rafa from '../assets/equipe/rafa.jpg';

export interface Pessoa { nome: string; foto: ImageMetadata; foco?: string }

export const equipe: Pessoa[] = [
  { nome: 'Anderson Almeida', foto: andersonAlmeida },
  { nome: 'André', foto: andre },
  { nome: 'Brito', foto: brito },
  { nome: 'Dani', foto: dani },
  { nome: 'Duda', foto: duda },
  { nome: 'Gabriel Lima', foto: gabrielLima },
  { nome: 'Geise', foto: geise },
  { nome: 'Igor', foto: igor },
  { nome: 'Isa', foto: isa },
  { nome: 'Julio Caldeira', foto: julioCaldeira },
  { nome: 'Lari', foto: lari },
  { nome: 'Lucas Campos', foto: lucasCampos },
  { nome: 'Maria', foto: maria },
  { nome: 'Milena', foto: milena },
  { nome: 'Pedro Joffily', foto: pedroJoffily },
  { nome: 'Pedro Packness', foto: pedroPackness },
  { nome: 'Rafa', foto: rafa },
];
