
#include <iostream>
#include <windows.h> // Для функции Sleep() и system()

using namespace std;

int main() {
    // Включаем поддержку русского языка и делаем текст зеленым (как в Матрице)
    system("chcp 65001 > nul");
    system("color 0A"); 
    system("cls");

    cout << "==========================================" << endl;
    cout << "       Y&M OS - Anniversary Edition       " << endl;
    cout << "==========================================" << endl << endl;
    Sleep(1000);

    // Фейковая проверка железа
    cout << "[SYS] Сканирование процессора... OK" << endl;
    Sleep(800);
    cout << "[SYS] Проверка видеокарты... OK" << endl;
    Sleep(1200);
    cout << "[SYS] Подключение к главному серверу... OK" << endl;
    Sleep(1000);

    cout << "\n[ВНИМАНИЕ] Обнаружен критический уровень чувств в системе!" << endl;
    Sleep(1500);
    cout << "Инициализация протокола «Идеальный парень»..." << endl;
    Sleep(1500);

    cout << "\nРаспаковка сюрприза:" << endl;
    
    // Рисуем крутую полосу загрузки с помощью цикла
    cout << "[";
    for (int i = 0; i < 30; i++) {
        cout << "#";
        Sleep(100); // Скорость заполнения полоски (100 мс)
    }
    cout << "] 100%" << endl << endl;

    Sleep(800);
    cout << "Готово! Система перенаправляет вас..." << endl;
    Sleep(1500);

    // Открываем сайт
    system("start index.html"); 

    return 0;
}
