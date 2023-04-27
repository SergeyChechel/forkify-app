import icons from '../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup(searchObj) {
    const curPage = searchObj.page;
    const numPages = Math.ceil(
      searchObj.results.length / searchObj.resultsRepPage
    );

    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._markupNextBtn(curPage);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._markupPrevBtn(curPage);
    }
    // Other page
    if (curPage < numPages && curPage !== 1) {
      return `${this._markupPrevBtn(curPage)}${this._markupNextBtn(curPage)}`;
    }
    // Page 1
    return '';
  }

  _markupNextBtn(numPage) {
    return `
        <button data-goto="${
          numPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${numPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
  }

  _markupPrevBtn(numPage) {
    return `
        <button data-goto="${
          numPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${numPage - 1}</span>
        </button>
        `;
  }
}

export default new PaginationView();
