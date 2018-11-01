/* eslint-disable no-undef */
import {fetchDetail} from '../service/movieService.js';

let movieInfo = {
    title: '',
    poster: '',
    actors: [],
    crew: []
};
const listType = {
    actor: 'actor',
    crew: 'crew'
};
const parseActor = (list) => {
    return `${ list.map(actor => `<li> ${ actor.character} By ${actor.name}</li>`).join('')}`;
};
const parseCrew = (list) => {
    return `${ list.map(c => `<li> ${c.job} : ${c.name}</li>`).join('')}`;
};
const changeListDom = (selector, str) => {
    $(selector).html('').html(str);
}
const renderResult = (result) => {
    const {poster, title, actors, crew} = result;
    const tpl = `<div class="movie-poster">
            <img src="${poster}" alt=""/>
        </div>
        <div class="movie-info">
            <h2 class="title">${title}</h2>
            <p class="actor"><span>Actors</span></p>
            <ul class="actor-list">
                ${ actors.length > 5 ? parseActor(actors.slice(0, 5)) : parseActor(actors) }
            </ul>
            ${ actors.length > 5 ? `<button class="toggleBtn" data-list-type=${listType.actor} data-toggle="hide"> show more </button>` : ''}
            <p class="crew">Crew</p>
            <ul class="crew-list">
                 ${ crew.length > 5 ? parseCrew(crew.slice(0, 5)) : parseCrew(crew) }
            </ul>
            ${ actors.length > 5 ? `<button class="toggleBtn" data-list-type=${listType.crew}  data-toggle="hide"> show more </button>` : ''}

        </div>`;
    $('.movie').html('').html(tpl);
};
const attachEventHandler = () => {
    $('.movie').on('click', '.toggleBtn', (e) => {
        const $el = $(e.target);
        const type = $el.data('listType');
        const currentStatus = $el.data('toggle');
        if (currentStatus === 'hide') {
            $el.data('toggle', 'show')
            type === listType.actor ?
                changeListDom('.actor-list', parseActor(movieInfo.actors)) :
                changeListDom('.crew-list', parseCrew(movieInfo.crew));
            $el.text('collapse list')
        } else {
            $el.data('toggle', 'hide')
            type === listType.actor ?
                changeListDom('.actor-list', parseActor(movieInfo.actors.slice(0, 5))) :
                changeListDom('.crew-list', parseCrew(movieInfo.crew.slice(0, 5)));
            $el.text('show more')
        }

    })
}
const fetchData = async (queryKeyWords) => {
    const $loadinMask = $(".loading-mask");
    $loadinMask.addClass('loading');
    const result = await fetchDetail(queryKeyWords);
    $loadinMask.removeClass('loading');
    return result;
}

$(document).ready(async () => {
    const data = await fetchData('Titanic');
    movieInfo = Object.assign({}, movieInfo, data);
    renderResult(movieInfo);
    attachEventHandler();
});