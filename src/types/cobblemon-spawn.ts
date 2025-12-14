/**
 * Representa uma entrada de configuração de spawn para um Pokémon no mod Cobblemon.
 * Cada objeto define as regras de onde, quando e como uma espécie específica pode aparecer no mundo.
 */
export interface CobblemonSpawnEntry {
  /**
   * Identificador sequencial ou ID da entrada na tabela de spawns.
   * Geralmente usado para ordenação interna.
   */
  s: string;

  /**
   * O nome da espécie do Pokémon.
   * Ex: "Bulbasaur", "Pikachu".
   */
  Pokémon: string;

  /**
   * Número da entrada variante para o mesmo Pokémon.
   * Um Pokémon pode ter múltiplas entradas se aparecer em biomas diferentes com regras diferentes.
   */
  Entry: string;

  /**
   * Categoria de raridade do spawn.
   * Determina a frequência relativa com que o jogo tenta gerar este Pokémon.
   * Valores comuns: 'common', 'uncommon', 'rare', 'ultra-rare'.
   */
  Bucket: "common" | "uncommon" | "rare" | "ultra-rare" | string;

  /**
   * Peso do spawn dentro do "Bucket".
   * Quanto maior o número, maior a chance de ser escolhido em comparação a outros no mesmo Bucket.
   * (Representa um valor numérico float em string).
   */
  Weight: string;

  /**
   * Nível mínimo que o Pokémon terá ao aparecer selvagem.
   * (Representa um valor numérico inteiro em string).
   */
  "Lv. Min": string;

  /**
   * Nível máximo que o Pokémon terá ao aparecer selvagem.
   * (Representa um valor numérico inteiro em string).
   */
  "Lv. Max": string;

  /**
   * Lista de Biomas ou Tags de Biomas permitidos.
   * Pode conter IDs de biomas (ex: 'minecraft:jungle') ou categorias do Cobblemon (ex: 'Jungle', 'Tropical Island').
   * Separado por vírgulas.
   */
  Biomes: string;

  /**
   * Lista de Biomas ou Tags explicitamente proibidos.
   * Se o jogador estiver nestes biomas, o Pokémon não aparecerá, mesmo que o bioma permitido coincida.
   */
  "Excluded Biomes": string;

  /**
   * Condição de horário do jogo (Time of Day).
   * 'any': Qualquer horário.
   * 'day': Apenas durante o dia (tick 0-12000).
   * 'night': Apenas durante a noite (tick 13000-23000).
   * 'dusk': Entardecer.
   */
  Time: "any" | "day" | "night" | "dusk" | "dawn" | string;

  /**
   * Condição climática necessária no jogo.
   * 'any': Qualquer clima.
   * 'clear': Céu limpo.
   * 'rain': Chuva ou neve (precipitação).
   * 'storm': Tempestade de raios.
   */
  Weather: "any" | "clear" | "rain" | "storm" | string;

  /**
   * Multiplicadores de peso baseados em condições.
   * Ex: "Storm x5" significa que o peso do spawn é multiplicado por 5 se estiver trovoando.
   */
  Multipliers: string;

  /**
   * Contexto físico do spawn.
   * 'grounded': No chão sólido (padrão).
   * 'submerged': Debaixo d'água (nadando).
   * 'surface': Na superfície da água.
   * 'fishing': Apenas obtido através da mecânica de pesca.
   * 'seafloor': No chão, mas debaixo d'água.
   * 'air' / 'sky': Voando (em biomas como The End ou Sky).
   */
  Context:
    | "grounded"
    | "submerged"
    | "surface"
    | "fishing"
    | "seafloor"
    | "air"
    | string;

  /**
   * Predefinições de configuração (Presets).
   * Agrupa configurações comuns como "Natural" (spawn padrão), "Urban" (vilas), "Water", etc.
   */
  Presets: string;

  /**
   * Condições específicas avançadas (Requirement Set).
   * Pode incluir:
   * - Blocos específicos (ex: 'minecraft:water').
   * - Estruturas (ex: 'structure:minecraft:village').
   * - Níveis Y (ex: 'minY = 62').
   * - Fases da lua (ex: 'Full Moon').
   * - Itens próximos.
   */
  Conditions: string;

  /**
   * Condições inversas (Negative Requirement Set).
   * O spawn falhará se qualquer uma dessas condições for verdadeira.
   * Ex: "minY = 0" aqui significaria "Não spawnar abaixo da camada 0".
   */
  Anticonditions: string;

  /**
   * Nível mínimo de luz do céu (Sky Light) necessário.
   * Vai de 0 (escuro total/caverna) a 15 (céu aberto).
   * "0" a "7" geralmente indica spawns de caverna ou noturnos que requerem escuridão.
   * "8" a "15" indica spawns diurnos ou superficiais.
   */
  skyLightMin: string;

  /**
   * Nível máximo de luz do céu permitido.
   */
  skyLightMax: string;

  /**
   * Verifica se o local de spawn tem acesso visual ao céu.
   * "TRUE": Precisa ver o céu (superfície).
   * "FALSE": Não pode ver o céu (cavernas/interiores).
   * "": Indiferente.
   */
  canSeeSky: "TRUE" | "FALSE" | "any" | "" | string;

  /**
   * Propriedade especial para definir variações (Forms/Variants) via NBT ou propriedades do Cobblemon.
   * Ex: "region_bias=alola" (para forma de Alola), "snake_pattern=classic" (para Ekans/Arbok), "tea_authenticity=antique" (Sinistea).
   * Define qual variante visual ou regional será spawnada.
   */
  "Patternkey=Value": string;
}

/**
 * O JSON completo é um array desses objetos.
 */
export type CobblemonSpawnTable = CobblemonSpawnEntry[];
