import { mount } from "@vue/test-utils";
import Counter from '@/components/Counter';

describe('Component Counter', () => {
    it('should render the correct markup', () => {
        const wrapper = mount(Counter);
        expect(wrapper.html()).toContain('<span>1</span>');
    });

    it('should set count with data default', () => {
        const wrapper = mount(Counter);
        expect(Number(wrapper.find('span').text())).toBe(1);
    });

    it('should set count with data default', () => {
        const wrapper = mount(Counter, {
            propsData: { count: 10 },
        });
        const countDefault = 10;
        // wrapper.setProps({ count: 10 });
        expect(Number(wrapper.find('span').text())).toBe(countDefault);
    });

    it('Button click should increment the myCount', async () => {
        const wrapper = mount(Counter);
        expect(wrapper.vm.myCount).toBe(1);
        const button = wrapper.find('button');
        await button.trigger('click');
        expect(Number(wrapper.find('span').text())).toBe(2);
    }); // Se espera (async/await) hasta que se dispara el click del button, porque de lo contrario no da tiempo a actualizar el DOM. VER:
    // https://vue-test-utils.vuejs.org/guides/#simulating-user-interaction
    // https://vue-test-utils.vuejs.org/guides/#updates-applied-by-vue
    // https://youtu.be/f8kLwBYcmpE?t=521

    it("Should emit event 'increment", () => {
        const wrapper = mount(Counter);
        const button = wrapper.find('button');
        button.trigger('click');

        expect(wrapper.emitted().increment).toBeTruthy();
        expect(wrapper.emitted().increment[0]).toEqual([2]);
    }); // "increment[0]" es el primer elemento de un array y dicho array es "[2]"
});