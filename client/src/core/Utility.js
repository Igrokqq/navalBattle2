export class Utility {
    static getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static setCursor(cursor) {
        document.body.style.cursor = cursor;
    }

    static cloneEntity(entity) {
        let newEntity = Object.assign( Object.create( Object.getPrototypeOf(entity)), entity);
        newEntity.setParent(entity);

        return newEntity;
    }

    static getHash(length) {
        let hash = '';
        const symbols = '0123456789ABCDEF#$()^%@';

        for (let i = 0; i < length; i += 1) {
            const index = Math.floor(Math.random() * 16);

            hash += [...symbols][index];
        }

        return hash;
    }
}
