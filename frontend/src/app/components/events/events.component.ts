import { Component, OnInit } from "@angular/core";
import { Event } from "src/app/models/event";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
  // static data
  events: Event[] = [];

  randomParagraphs: string[] = [
    `At that moment he had a thought that he'd never imagine he'd consider. "I could just cheat," he thought, "and that would solve the problem." He tried to move on from the thought but it was persistent. It didn't want to go away and, if he was honest with himself, he didn't want it to.`,

    `He heard the crack echo in the late afternoon about a mile away. His heart started racing and he bolted into a full sprint. "It wasn't a gunshot, it wasn't a gunshot," he repeated under his breathlessness as he continued to sprint.`,

    `Many people say that life isn't like a bed of roses. I beg to differ. I think that life is quite like a bed of roses. Just like life, a bed of roses looks pretty on the outside, but when you're in it, you find that it is nothing but thorns and pain. I myself have been pricked quite badly.`,

    `The chair sat in the corner where it had been for over 25 years. The only difference was there was someone actually sitting in it. How long had it been since someone had done that? Ten years or more he imagined. Yet there was no denying the presence in the chair now.`,

    `There was no time. He ran out of the door without half the stuff he needed for work, but it didn't matter. He was late and if he didn't make this meeting on time, someone's life may be in danger.`,

    `Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.`,

    `Was it enough? That was the question he kept asking himself. Was being satisfied enough? He looked around him at everyone yearning to just be satisfied in their daily life and he had reached that goal. He knew that he was satisfied and he also knew it wasn't going to be enough.`,

    `Things aren't going well at all with mom today. She is just a limp noodle and wants to sleep all the time. I sure hope that things get better soon.`,

    `It was going to rain. The weather forecast didn't say that, but the steel plate in his hip did. He had learned over the years to trust his hip over the weatherman. It was going to rain, so he better get outside and prepare.`,

    `Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen`,
  ];

  constructor() {}

  ngOnInit() {
    this.generateStaticEvents();
  }

  generateStaticEvents(): void {
    for (let i = 1; i <= 10; i++) {
      const event: Event = {
        id: i,
        title: `Event ${i}`,
        date: "2018-05-19",
        speaker: `Speaker ${i}`,
        venue: `Venue ${i}`,
        time: "13:00 GMT",
        details: {
          theme: "This is the theme 01",
          special_guest: "Paapa Yesu Kristo",
        },
        description: this.randomParagraphs[9],
        image: `event_${i}.jpg`,
      };
      this.events.push(event);
    }
  }
}
