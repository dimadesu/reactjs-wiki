import expect from 'expect';
import jsdomReact from '../jsdomReact';
import React from 'react/addons';
import Footer from '../../components/Footer';
import { SHOW_ALL, SHOW_NOT_BOOKMARKED } from '../../constants/PageFilters';

const { TestUtils } = React.addons;

function setup(propOverrides) {
  const props = Object.assign({
    bookmarkedCount: 0,
    notBookmarkedCount: 0,
    filter: SHOW_ALL,
    onEmptyBookmarked: expect.createSpy(),
    onShow: expect.createSpy()
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<Footer {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output
  };
}

function getTextContent(elem) {
  const children = Array.isArray(elem.props.children) ?
    elem.props.children : [elem.props.children];

  return children.reduce(function concatText(out, child) {
    // Children are either elements or text strings
    return out + (child.props ? getTextContent(child) : child);
  }, '');
}

describe('components', () => {
  jsdomReact();

  describe('Footer', () => {
    it('should render container', () => {
      const { output } = setup();
      expect(output.type).toBe('footer');
      expect(output.props.className).toBe('footer');
    });

    it('should display active count when 0', () => {
      const { output } = setup({ notBookmarkedCount: 0 });
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe('No items');
    });

    it('should display active count when above 0', () => {
      const { output } = setup({ notBookmarkedCount: 1 });
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe('1 item');
    });

    it('should render filters', () => {
      const { output } = setup();
      const [, filters] = output.props.children;
      expect(filters.type).toBe('ul');
      expect(filters.props.className).toBe('filters');
      expect(filters.props.children.length).toBe(3);
      filters.props.children.forEach(function checkFilter(filter, i) {
        expect(filter.type).toBe('li');
        const a = filter.props.children;
        expect(a.props.className).toBe(i === 0 ? 'selected' : '');
        expect(a.props.children).toBe({
          0: 'All',
          1: 'NotBookmarked',
          2: 'Bookmarked'
        }[i]);
      });
    });

    it('should call onShow when a filter is clicked', () => {
      const { output, props } = setup();
      const [, filters] = output.props.children;
      const filterLink = filters.props.children[1].props.children;
      filterLink.props.onClick({});
      expect(props.onShow).toHaveBeenCalledWith(SHOW_NOT_BOOKMARKED);
    });

    it('shouldnt show clear button when no bookmarked pages', () => {
      const { output } = setup({ bookmarkedCount: 0 });
      const [,, clear] = output.props.children;
      expect(clear).toBe(undefined);
    });

    it('should render clear button when bookmarked pages', () => {
      const { output } = setup({ bookmarkedCount: 1 });
      const [,, clear] = output.props.children;
      expect(clear.type).toBe('button');
      expect(clear.props.children).toBe('Delete all bookmarks');
    });

    it('should call onEmptyBookmarked on archive button click', () => {
      const { output, props } = setup({ bookmarkedCount: 1 });
      const [,, clear] = output.props.children;
      clear.props.onClick({});
      expect(props.onEmptyBookmarked).toHaveBeenCalled();
    });
  });
});
