import { Note } from "@/app/notes/types";

const notes: Note[] = [];

notes.push(
  ...Array(11)
    .fill("")
    .map((_, i): Note => {
      return {
        id: `${i}`,
        user_id: `${i}`,
        title: `note ${i}`,
        body: "Arugula bell bok broccoli bunya carrot caulie chestnut chicory collard courgette cucumber epazote garbanzo green. Amaranth artichoke avocado azuki black-eyed bok broccoli brussels burdock cabbage celery celtuce chestnut chickpea chicory choy collard cress daikon desert dulse earthnut epazote fennel garlic greens. Artichoke arugula bean beet beetroot bitterleaf black-eyed bona broccoli bunya bush cabbage carrot caulie celery chard chicory choy daikon dandelion desert dulse epazote fennel gourd green.",
        created_at: new Date(),
        updated_at: new Date(),
      };
    }),
);

export default notes;
