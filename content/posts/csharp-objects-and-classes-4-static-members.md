---
title: "C#學習筆記-物件與類別(4):靜態類別與靜態成員"
description: "靜態成員與執行個體成員最大的差異是存取路徑不同，當呼叫執行個體成員時，需要透過執行個體變數名稱存取；呼叫靜態成員時，則透過類別名稱（型別物件）來存取靜態成員。 ## 靜態類別 在 class 關鍵字前加入 static 即為靜態類別。 靜態類別具有以下幾點特性： - 靜態類別的成員必須都是靜態的。 "
publishDate: 2022-06-17
category: "C#學習筆記"
tags: ["C#","note"]
legacyPath: "/2022/06/17/C-學習筆記-物件與類別-4-靜態類別與靜態類別成員/"
draft: false
---

靜態成員與執行個體成員最大的差異是存取路徑不同，當呼叫執行個體成員時，需要透過執行個體變數名稱存取；呼叫靜態成員時，則透過類別名稱（型別物件）來存取靜態成員。
## 靜態類別
在`class`關鍵字前加入`static`即為靜態類別。
靜態類別具有以下幾點特性：
- 靜態類別的成員必須都是靜態的。
- 靜態類別無法實體化，換句話說就是不能使用`new`關鍵字產生執行個體。
- 靜態類別是密封的，換句話說就是無法進行繼承。
- 沒有執行個體建構函式，只有「靜態建構函式」
```csharp
public static class TemperatureConverter
{
    public static double CelsiusToFahrenheit(double temperatureCelsius)
    {
        double fahrenheit = (temperatureCelsius * 9 / 5) + 32;

        return fahrenheit;
    }

    public static double FahrenheitToCelsius(double temperatureFahrenheit)
    {
        double celsius = (temperatureFahrenheit - 32) * 5 / 9;

        return celsius;
    }

}

class Program
{
    static void Main(string[] args)
    {
        double temperatureC = 100;
        double temperatureF = TemperatureConverter.CelsiusToFahrenheit(temperatureC);
        Console.WriteLine($"攝氏溫度：{temperatureC}轉換成華氏溫度：{temperatureF}");
        Console.ReadLine();
    }
}
```

在 .NET 類別庫中，靜態 [System.Math 類別](https://docs.microsoft.com/zh-TW/dotnet/api/system.math?view=net-6.0)包含執行數學運算的方法，而不需要儲存或擷取特定類別實例 Math 特有的資料。

程式無法指定確實載入靜態類別的時間。 不過一定會載入類別、初始化其欄位，並在第一次於程式中參考類別之前呼叫其靜態建構函式（只會呼叫靜態建構函式一次），而且靜態類別在程式所在應用程式定義域的存留期間保留在記憶體中。

## 靜態類別成員
非靜態類別可以包含靜態方法、欄位、屬性或事件。 即使尚未建立類別的執行個體（還沒`new`之前），還是可以在類別上呼叫靜態成員。

非靜態類別可以有靜態成員，靜態成員一律透過類別名稱進行存取，而不是執行個體名稱。不論建立了多少個執行個體，都只會有一個靜態成員複本（會在執行個體間共用）。

在類別成員回傳型別之前加入`static`關鍵字就是宣告為「靜態成員」
```csharp
public class Automobile
{
    private static int _sizeOfGasTank;
    //靜態建構函式
    static Automobile()
    {
        _sizeOfGasTank = 15;
    }
    public static int NumberOfWheels = 4;

    public static int SizeOfGasTank
    {
        get
        {
            return _sizeOfGasTank;
        }
    }
    public static void Drive() { }
    public string Name {get; set;}
}

class Program
{
    static void Main(string[] args)
    {
        //產生Automobile執行個體，存到car變數
        Automobile car = new Automobile();

        //從類別名稱取得靜態成員
        Automobile.Drive();
        int i = Automobile.NumberOfWheels;
        int sizeOfTank = Automobile.SizeOfGasTank;
        Console.ReadLine();
    }
}
```

第一次存取靜態成員之前，以及呼叫靜態建構函式 (如果有的話) 之前，都會初始化靜態成員。 若要存取靜態類別成員，使用類別的名稱來指定成員的位置。

如果類別包含靜態欄位時，則需靜態建構函式，讓類別載入時初始化欄位。



## 小結
- 靜態類別是不會產生執行個體的，也就是不能`new`出物件存放到變數內。
- 靜態類別在程式所在應用程式定義域的存留期間保留在記憶體中（與天同壽）。
- 設計靜態欄位時，需要注意初始化的問題，如果需要初始化靜態欄位，則需要使用「靜態建構函式」來初始化靜態欄位，否則這個靜態欄位的初始值就是其型別的預設值。
- 如果類別內的所有成員都是屬於靜態成員時，因為靜態類別的特性（裡面的成員必須都是靜態的）則可以考慮將這個類別設計成「靜態類別」。
- 如果需要設計在類別的每個執行個體間會互相共用的內容，或需持續計算已具現化的物件數目時，就可以考慮將其設計為「靜態成員」即可。
- 我們可能會大多會在一般類別內設計「靜態成員」，而不是一整個「靜態類別」。



## 參考資料
- https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members
