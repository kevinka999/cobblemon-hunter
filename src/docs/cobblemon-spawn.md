# Sistema de Spawn - Cobblemon

Este documento detalha o sistema completo de spawn do mod Cobblemon, incluindo os arquivos de spawn (Spawn Pool World) e as condições específicas que determinam onde e quando um Pokémon pode aparecer.

---

## 📝 Visão Geral

Os arquivos de spawn (ou _spawn files_) definem:

1. **Qual** Pokémon irá aparecer.
2. **A raridade** (rarity) dele.
3. **O nível** em que ele irá aparecer.
4. **As condições** exatas para que ele apareça.

Todo Pokémon implementado tem pelo menos um conjunto de dados de spawn. Sem esses dados, ele só pode ser invocado por comandos.

---

## ⚙️ Propriedades Principais em um Arquivo de Spawn

Um arquivo de spawn é uma estrutura JSON que contém uma lista de entradas de spawn.

| Propriedade no JSON       | Descrição                                                                 | Valores Comuns                                    |
| :------------------------ | :------------------------------------------------------------------------ | :------------------------------------------------ |
| **enabled**               | Se o arquivo de spawn está ativo (`true`) ou não.                         | `true`, `false`                                   |
| **neededInstalledMods**   | Lista de mods que **precisam** estar instalados para que o spawn ocorra.  | IDs de mods (ex: `minecraft`, `create`)           |
| **neededUninstalledMods** | Lista de mods que **não podem** estar instalados para que o spawn ocorra. | IDs de mods                                       |
| **spawns**                | Uma lista de regras de spawn específicas para o Pokémon.                  | Uma matriz de objetos de spawn (detalhes abaixo). |

---

## 🎯 Regras de Spawn (dentro de "spawns")

Cada objeto dentro da lista `"spawns"` pode ter as seguintes chaves:

| Chave                | Descrição                                                                                     | Valores Comuns                                                                                                                         |
| :------------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **id**               | Um identificador único para esta regra de spawn específica.                                   | Ex: `"bulbasaur-1"`                                                                                                                    |
| **pokemon**          | O nome do Pokémon que irá aparecer.                                                           | Ex: `"bulbasaur"`                                                                                                                      |
| **presets**          | Conjunto pré-definido de condições de spawn. Você pode usar presets prontos ou criar os seus. | Ex: `"natural"`, `"wild"`, `"water"`                                                                                                   |
| **type**             | O tipo de entidade que está sendo configurada para spawnar.                                   | Ex: `"pokemon"`                                                                                                                        |
| **context**          | O ambiente de spawn (o local físico) que a regra se aplica.                                   | **`grounded`** (terra), **`submerged`** (debaixo d'água/lava), **`surface`** (superfície da água/lava), **`fishing`** (vara de pesca). |
| **bucket**           | O grupo de raridade do Pokémon.                                                               | **`common`** (Comum), **`uncommon`** (Incomum), **`rare`** (Raro), **`ultra-rare`** (Ultra-Raro).                                      |
| **level**            | O intervalo de nível em que o Pokémon pode aparecer.                                          | Ex: `"5-32"`                                                                                                                           |
| **weight**           | Define a frequência do Pokémon **dentro do seu grupo de raridade** (`bucket`).                | Um valor de 0.1 a 10 (ou mais) – quanto maior, mais comum.                                                                             |
| **condition**        | O objeto de condições que **devem ser atendidas** para o spawn.                               | Utiliza todas as propriedades de "Condição de Spawn" (biomas, clima, luz, etc.) - ver seção abaixo.                                    |
| **anticondition**    | O objeto de condições que **NÃO DEVEM ser atendidas** para o spawn.                           | O inverso de `condition` (ex: `{"isThundering": true}` impede o spawn se estiver trovejando).                                          |
| **weightMultiplier** | Multiplica o valor de `weight` se um segundo conjunto de condições for atendido.              | Um objeto que inclui um `multiplier` (ex: `5.0`) e um `condition`.                                                                     |

---

## ⭐️ Exemplo de Multiplicador de Peso (`weightMultiplier`)

Permite aumentar a chance de um Pokémon aparecer sob condições específicas (ex: Elekid durante uma tempestade).

```json
"weight": 1.8,
"weightMultiplier": {
    "multiplier": 5.0,  // Multiplica 1.8 por 5.0 (novo peso: 9.0)
    "condition": {
        "isThundering": true // Apenas se estiver trovejando
    }
},
"condition": {
    // ... Condições básicas (biomas, etc.)
}
```

---

## 🔍 Condições de Spawn (Spawn Conditions)

As condições de spawn são um conjunto de regras que decidem se um Pokémon específico é compatível com o local e o momento atual. Elas são utilizadas nas propriedades `condition`, `anticondition` e dentro de `weightMultiplier.condition`.

**Regra Geral Importante:** Qualquer propriedade que for **deixada em branco ou vazia** na condição **não será verificada**. Por exemplo, se a lista de biomas estiver vazia, o bioma não afetará o spawn.

---

### 🌍 Propriedades Comuns (Gerais)

Estas propriedades se aplicam a **todos** os tipos de contextos de spawn:

| Propriedade         | Descrição                                                                                      | Notas de Exemplo                                                                                      |
| :------------------ | :--------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **dimensions**      | Lista de dimensões onde o spawn pode ocorrer.                                                  | `minecraft:overworld`, `minecraft:the_nether`                                                         |
| **biomes**          | Lista de condições baseadas em biomas.                                                         | Pode ser um ID (ex: `minecraft:forest`) ou uma _tag_ (começa com `#`, ex: `#pokemoncobbled:is_arid`). |
| **structures**      | Lista de estruturas onde o Pokémon pode aparecer.                                              | `minecraft:stronghold`, `minecraft:desert_pyramid`                                                    |
| **moonPhase**       | Fase da lua necessária (número de 0 a 7).                                                      |                                                                                                       |
| **canSeeSky**       | Se o local precisa ter uma rota direta para o céu (`true` ou `false`).                         | Fluidos não contam como obstrução.                                                                    |
| **min/maxX, Y, Z**  | Coordenadas mínimas e máximas (X, Y, Z) do local.                                              |                                                                                                       |
| **min/maxLight**    | Nível de luz ambiente (0-15) aceitável.                                                        |                                                                                                       |
| **min/maxSkyLight** | Nível de luz do céu (0-15) aceitável.                                                          |                                                                                                       |
| **timeRange**       | Faixa de tempo aceitável.                                                                      | Pode ser um nome (`day`, `night`) ou uma lista de _ticks_ (`0-1200,2000-3000`).                       |
| **isRaining**       | Se deve estar chovendo (`true`) ou não (`false`).                                              |                                                                                                       |
| **isThundering**    | Se deve estar trovejando (`true`) ou não (`false`).                                            | Se estiver trovejando, também conta como chovendo.                                                    |
| **isSlimeChunk**    | Se deve ser um _slime chunk_ (`true` ou `false`).                                              |                                                                                                       |
| **labels**          | Rótulos (ou tags) exigidos no spawn, usados para filtros mais específicos.                     |                                                                                                       |
| **labelMode**       | Como os rótulos serão verificados: `ANY` (qualquer um serve) ou `ALL` (todos são necessários). |                                                                                                       |

---

### 📝 Tipos de Condições Específicas por Contexto

Estas condições adicionam regras para ambientes mais específicos, dependendo do valor da propriedade `context` na regra de spawn.

#### 1. Condições de Spawn de Área

_Aplicam-se a todo spawn no mundo que não seja pesca (terra, água, ar, etc.). Usadas para contextos como `grounded`, `submerged` e `surface`._

| Propriedade            | Descrição                                                   |
| :--------------------- | :---------------------------------------------------------- |
| **min/maxWidth**       | Espaço horizontal mínimo/máximo necessário ao redor.        |
| **min/maxHeight**      | Espaço vertical mínimo/máximo necessário acima.             |
| **neededNearbyBlocks** | Lista de blocos que devem estar próximos ao local de spawn. |

#### 2. Condições de Spawn no Chão (Grounded)

_Aplicam-se a spawns na terra/solo quando `context: "grounded"`. São um sub-tipo de "Área"._

| Propriedade          | Descrição                                                                                                             |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **neededBaseBlocks** | Lista de IDs de blocos, sendo que **pelo menos um** deles deve ser o bloco que o Pokémon está pisando (o bloco base). |

#### 3. Condições de Spawn Submerso (Submerged)

_Aplicam-se a spawns debaixo d'água ou sob lava quando `context: "submerged"`. São um sub-tipo de "Área"._

| Propriedade       | Descrição                                                                                       |
| :---------------- | :---------------------------------------------------------------------------------------------- |
| **min/maxDepth**  | Profundidade mínima/máxima de blocos de fluido **abaixo** do ponto de spawn.                    |
| **fluidIsSource** | Se o bloco de fluido onde o spawn ocorre precisa ser uma "fonte" de fluido (`true` ou `false`). |
| **fluid**         | Tipo de fluido em que o Pokémon deve surgir (ex: lista de IDs ou tags como `#minecraft:water`). |

#### 4. Condições de Pesca (Fishing)

_Aplicam-se à mecânica de pesca usando a Poké Rod quando `context: "fishing"`._

| Propriedade          | Descrição                                          |
| :------------------- | :------------------------------------------------- |
| **min/maxLureLevel** | Nível mínimo/máximo do encantamento _Lure_ (Isca). |
| **bobber**           | O tipo de boia (_bobber_) necessário para a pesca. |
| **bait**             | O tipo de isca (_bait_) necessário para a pesca.   |

---

## 📋 Exemplo Completo de Arquivo de Spawn

```json
{
  "enabled": true,
  "spawns": [
    {
      "id": "bulbasaur-forest",
      "pokemon": "bulbasaur",
      "type": "pokemon",
      "context": "grounded",
      "bucket": "ultra-rare",
      "level": "5-32",
      "weight": 6.0,
      "presets": "Natural",
      "condition": {
        "biomes": ["minecraft:jungle", "minecraft:bamboo_jungle"],
        "timeRange": "day",
        "canSeeSky": true,
        "minSkyLight": 8,
        "maxSkyLight": 15
      },
      "anticondition": {
        "isRaining": true
      },
      "weightMultiplier": {
        "multiplier": 2.0,
        "condition": {
          "isRaining": true
        }
      }
    }
  ]
}
```
